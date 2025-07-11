-- Fix decimal precision for monetary values
ALTER TABLE public.orders 
ALTER COLUMN total_amount TYPE DECIMAL(12,2);

ALTER TABLE public.order_items 
ALTER COLUMN unit_price TYPE DECIMAL(12,2),
ALTER COLUMN total_price TYPE DECIMAL(12,2);

ALTER TABLE public.payments 
ALTER COLUMN amount TYPE DECIMAL(12,2);

ALTER TABLE public.cart_items 
ALTER COLUMN unit_price TYPE DECIMAL(12,2),
ALTER COLUMN total_price TYPE DECIMAL(12,2);

ALTER TABLE public.conversions 
ALTER COLUMN conversion_value TYPE DECIMAL(12,2);

-- Add proper constraints for email validation
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_email_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE public.orders 
ADD CONSTRAINT orders_email_check 
CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

-- Add constraint for phone number format (international format)
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_phone_check 
CHECK (phone IS NULL OR phone ~* '^\+?[1-9]\d{1,14}$');

-- Add constraint for postal code
ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_postal_code_check 
CHECK (postal_code IS NULL OR LENGTH(postal_code) BETWEEN 3 AND 12);

-- Add constraint for currency codes (ISO 4217)
ALTER TABLE public.orders 
ADD CONSTRAINT orders_currency_check 
CHECK (currency IN ('USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SEK', 'NOK', 'DKK', 'CHF'));

ALTER TABLE public.payments 
ADD CONSTRAINT payments_currency_check 
CHECK (currency IN ('USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SEK', 'NOK', 'DKK', 'CHF'));

ALTER TABLE public.conversions 
ADD CONSTRAINT conversions_currency_check 
CHECK (currency IN ('USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SEK', 'NOK', 'DKK', 'CHF'));

ALTER TABLE public.profiles 
ADD CONSTRAINT profiles_currency_check 
CHECK (preferred_currency IN ('USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'SEK', 'NOK', 'DKK', 'CHF'));

-- Fix quantity constraints
ALTER TABLE public.order_items 
ADD CONSTRAINT order_items_quantity_check 
CHECK (quantity > 0 AND quantity <= 10);

ALTER TABLE public.cart_items 
ADD CONSTRAINT cart_items_quantity_check 
CHECK (quantity > 0 AND quantity <= 10);

-- Add constraint for product types consistency
ALTER TABLE public.order_items 
DROP CONSTRAINT IF EXISTS order_items_product_type_check,
ADD CONSTRAINT order_items_product_type_check 
CHECK (product_type IN ('single', 'bundle_3', 'bundle_5'));

ALTER TABLE public.cart_items 
DROP CONSTRAINT IF EXISTS cart_items_product_type_check,
ADD CONSTRAINT cart_items_product_type_check 
CHECK (product_type IN ('single', 'bundle_3', 'bundle_5'));

-- Add updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at fields
CREATE TRIGGER trigger_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_cart_items_updated_at
    BEFORE UPDATE ON public.cart_items
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_customer_preferences_updated_at
    BEFORE UPDATE ON public.customer_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_customer_notes_updated_at
    BEFORE UPDATE ON public.customer_notes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

-- Add validation for Meta Pixel ID
ALTER TABLE public.analytics_events 
ADD CONSTRAINT analytics_events_meta_pixel_id_check 
CHECK (meta_pixel_id ~ '^\d{15}$');

-- Add validation for session IDs (should be non-empty strings)
ALTER TABLE public.cart_items 
ADD CONSTRAINT cart_items_session_id_check 
CHECK (session_id IS NULL OR LENGTH(session_id) > 0);

ALTER TABLE public.analytics_events 
ADD CONSTRAINT analytics_events_session_id_check 
CHECK (session_id IS NULL OR LENGTH(session_id) > 0);

ALTER TABLE public.page_views 
ADD CONSTRAINT page_views_session_id_check 
CHECK (session_id IS NULL OR LENGTH(session_id) > 0);

ALTER TABLE public.conversions 
ADD CONSTRAINT conversions_session_id_check 
CHECK (session_id IS NULL OR LENGTH(session_id) > 0);

ALTER TABLE public.user_sessions 
ADD CONSTRAINT user_sessions_session_id_check 
CHECK (LENGTH(session_id) > 0);

-- Add check to ensure order total matches sum of order items
CREATE OR REPLACE FUNCTION validate_order_total()
RETURNS TRIGGER AS $$
DECLARE
    calculated_total DECIMAL(12,2);
BEGIN
    -- Calculate total from order items
    SELECT COALESCE(SUM(total_price), 0)
    INTO calculated_total
    FROM public.order_items
    WHERE order_id = NEW.order_id;
    
    -- Check if order exists and validate total
    IF EXISTS (SELECT 1 FROM public.orders WHERE id = NEW.order_id) THEN
        UPDATE public.orders 
        SET total_amount = calculated_total, updated_at = NOW()
        WHERE id = NEW.order_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to validate order totals
CREATE TRIGGER trigger_validate_order_total
    AFTER INSERT OR UPDATE OR DELETE ON public.order_items
    FOR EACH ROW
    EXECUTE FUNCTION validate_order_total(); 