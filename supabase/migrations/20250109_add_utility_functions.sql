-- Function to update customer statistics after order completion
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Only process completed orders
    IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
        UPDATE public.profiles 
        SET 
            total_orders = (
                SELECT COUNT(*) 
                FROM public.orders 
                WHERE user_id = NEW.user_id AND status = 'completed'
            ),
            total_spent = (
                SELECT COALESCE(SUM(total_amount), 0) 
                FROM public.orders 
                WHERE user_id = NEW.user_id AND status = 'completed'
            ),
            last_purchase_at = NEW.created_at,
            first_purchase_at = COALESCE(
                first_purchase_at,
                NEW.created_at
            ),
            updated_at = NOW()
        WHERE id = NEW.user_id;
        
        -- Update customer lifetime value (could include more complex calculation)
        UPDATE public.profiles 
        SET customer_lifetime_value = total_spent * 1.2  -- Example multiplier
        WHERE id = NEW.user_id;
        
        -- Create conversion tracking record
        INSERT INTO public.conversions (
            user_id, 
            order_id, 
            conversion_type, 
            conversion_value, 
            currency,
            product_type
        ) VALUES (
            NEW.user_id,
            NEW.id,
            'purchase',
            NEW.total_amount,
            NEW.currency,
            (SELECT string_agg(product_type, ',') FROM public.order_items WHERE order_id = NEW.id)
        );
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update customer stats
CREATE TRIGGER trigger_update_customer_stats
    AFTER UPDATE OF status ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_customer_stats();

-- Function to clean up old analytics data
CREATE OR REPLACE FUNCTION cleanup_old_analytics()
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER := 0;
BEGIN
    -- Delete analytics events older than 1 year
    DELETE FROM public.analytics_events 
    WHERE created_at < NOW() - INTERVAL '1 year';
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Delete page views older than 6 months
    DELETE FROM public.page_views 
    WHERE created_at < NOW() - INTERVAL '6 months';
    
    -- Delete user sessions older than 3 months
    DELETE FROM public.user_sessions 
    WHERE started_at < NOW() - INTERVAL '3 months';
    
    -- Delete performance metrics older than 6 months
    DELETE FROM public.performance_metrics 
    WHERE recorded_at < NOW() - INTERVAL '6 months';
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate customer segment
CREATE OR REPLACE FUNCTION calculate_customer_segment(user_id_param UUID)
RETURNS TEXT AS $$
DECLARE
    order_count INTEGER;
    total_spent DECIMAL;
    days_since_last_order INTEGER;
    segment TEXT;
BEGIN
    SELECT 
        COALESCE(COUNT(o.id), 0),
        COALESCE(SUM(o.total_amount), 0),
        COALESCE(EXTRACT(DAYS FROM NOW() - MAX(o.created_at)), 9999)
    INTO order_count, total_spent, days_since_last_order
    FROM public.orders o
    WHERE o.user_id = user_id_param AND o.status = 'completed';
    
    -- Determine segment based on business rules
    IF order_count = 0 THEN
        segment := 'new';
    ELSIF days_since_last_order > 180 THEN
        segment := 'inactive';
    ELSIF total_spent > 100 OR order_count > 10 THEN
        segment := 'vip';
    ELSE
        segment := 'regular';
    END IF;
    
    -- Update the profile with the calculated segment
    UPDATE public.profiles 
    SET customer_segment = segment, updated_at = NOW()
    WHERE id = user_id_param;
    
    RETURN segment;
END;
$$ LANGUAGE plpgsql;

-- Function to get cart total for a user or session
CREATE OR REPLACE FUNCTION get_cart_total(user_id_param UUID DEFAULT NULL, session_id_param TEXT DEFAULT NULL)
RETURNS DECIMAL AS $$
DECLARE
    cart_total DECIMAL := 0;
BEGIN
    IF user_id_param IS NOT NULL THEN
        SELECT COALESCE(SUM(total_price), 0)
        INTO cart_total
        FROM public.cart_items
        WHERE user_id = user_id_param;
    ELSIF session_id_param IS NOT NULL THEN
        SELECT COALESCE(SUM(total_price), 0)
        INTO cart_total
        FROM public.cart_items
        WHERE session_id = session_id_param;
    END IF;
    
    RETURN cart_total;
END;
$$ LANGUAGE plpgsql;

-- Function to merge guest cart with user cart after authentication
CREATE OR REPLACE FUNCTION merge_guest_cart(user_id_param UUID, session_id_param TEXT)
RETURNS INTEGER AS $$
DECLARE
    merged_count INTEGER := 0;
BEGIN
    -- Update guest cart items to belong to the authenticated user
    UPDATE public.cart_items 
    SET 
        user_id = user_id_param,
        session_id = NULL,
        updated_at = NOW()
    WHERE session_id = session_id_param AND user_id IS NULL;
    
    GET DIAGNOSTICS merged_count = ROW_COUNT;
    
    RETURN merged_count;
END;
$$ LANGUAGE plpgsql;

-- Function to calculate order statistics
CREATE OR REPLACE FUNCTION get_order_statistics(start_date DATE DEFAULT NULL, end_date DATE DEFAULT NULL)
RETURNS JSON AS $$
DECLARE
    result JSON;
    start_filter TIMESTAMP;
    end_filter TIMESTAMP;
BEGIN
    start_filter := COALESCE(start_date::TIMESTAMP, NOW() - INTERVAL '30 days');
    end_filter := COALESCE(end_date::TIMESTAMP, NOW());
    
    SELECT json_build_object(
        'total_orders', COUNT(*),
        'total_revenue', COALESCE(SUM(total_amount), 0),
        'average_order_value', COALESCE(AVG(total_amount), 0),
        'completed_orders', COUNT(*) FILTER (WHERE status = 'completed'),
        'pending_orders', COUNT(*) FILTER (WHERE status = 'pending'),
        'cancelled_orders', COUNT(*) FILTER (WHERE status = 'cancelled'),
        'unique_customers', COUNT(DISTINCT user_id),
        'guest_orders', COUNT(*) FILTER (WHERE user_id IS NULL)
    ) INTO result
    FROM public.orders
    WHERE created_at BETWEEN start_filter AND end_filter;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to track analytics events
CREATE OR REPLACE FUNCTION track_analytics_event(
    user_id_param UUID DEFAULT NULL,
    session_id_param TEXT DEFAULT NULL,
    event_name_param TEXT,
    event_data_param JSONB DEFAULT NULL,
    page_url_param TEXT DEFAULT NULL,
    referrer_param TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    event_id UUID;
BEGIN
    INSERT INTO public.analytics_events (
        user_id,
        session_id,
        event_name,
        event_data,
        page_url,
        referrer
    ) VALUES (
        user_id_param,
        session_id_param,
        event_name_param,
        event_data_param,
        page_url_param,
        referrer_param
    ) RETURNING id INTO event_id;
    
    RETURN event_id;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION get_cart_total TO anon, authenticated;
GRANT EXECUTE ON FUNCTION merge_guest_cart TO authenticated;
GRANT EXECUTE ON FUNCTION track_analytics_event TO anon, authenticated;
GRANT EXECUTE ON FUNCTION calculate_customer_segment TO authenticated;
GRANT EXECUTE ON FUNCTION get_order_statistics TO authenticated; 