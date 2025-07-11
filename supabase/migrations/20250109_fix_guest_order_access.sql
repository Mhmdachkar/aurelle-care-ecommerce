-- Fix RLS policies to allow proper guest order access
-- Date: 2025-01-09
-- Description: Ensure guest orders can be accessed from frontend without authentication issues

-- Drop existing conflicting policies
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Anyone can insert orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
DROP POLICY IF EXISTS "Users can view order items" ON order_items;
DROP POLICY IF EXISTS "Anyone can insert order items" ON order_items;
DROP POLICY IF EXISTS "Users can view payments" ON payments;
DROP POLICY IF EXISTS "Anyone can insert payments" ON payments;

-- Create new comprehensive policies for orders
CREATE POLICY "Allow order access" ON orders
  FOR SELECT USING (
    -- Authenticated users can see their own orders
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    -- Anyone can see guest orders (including anonymous users)
    (is_guest = true AND user_id IS NULL)
  );

CREATE POLICY "Allow order creation" ON orders
  FOR INSERT WITH CHECK (
    -- Authenticated users can create their own orders
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    -- Anyone can create guest orders
    (is_guest = true AND user_id IS NULL)
  );

CREATE POLICY "Allow order updates" ON orders
  FOR UPDATE USING (
    -- Authenticated users can update their own orders
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    -- System can update guest orders (for webhook processing)
    (is_guest = true)
  );

-- Create new comprehensive policies for order_items
CREATE POLICY "Allow order items access" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (
        -- User owns the order
        (orders.user_id = auth.uid()) OR
        -- It's a guest order
        (orders.is_guest = true AND orders.user_id IS NULL)
      )
    )
  );

CREATE POLICY "Allow order items creation" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (
        -- User owns the order
        (orders.user_id = auth.uid()) OR
        -- It's a guest order
        (orders.is_guest = true AND orders.user_id IS NULL)
      )
    )
  );

-- Create new comprehensive policies for payments
CREATE POLICY "Allow payments access" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payments.order_id 
      AND (
        -- User owns the order
        (orders.user_id = auth.uid()) OR
        -- It's a guest order
        (orders.is_guest = true AND orders.user_id IS NULL)
      )
    )
  );

CREATE POLICY "Allow payments creation" ON payments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payments.order_id 
      AND (
        -- User owns the order
        (orders.user_id = auth.uid()) OR
        -- It's a guest order
        (orders.is_guest = true AND orders.user_id IS NULL)
      )
    )
  );

-- Add additional index for better performance on guest order queries
CREATE INDEX IF NOT EXISTS idx_orders_guest_session ON orders(stripe_session_id, is_guest) WHERE is_guest = true;

-- Grant necessary permissions for anonymous users to read guest orders
GRANT SELECT ON orders TO anon;
GRANT SELECT ON order_items TO anon;
GRANT SELECT ON payments TO anon;

-- Create a function to safely get order by session_id (both for authenticated and guest users)
CREATE OR REPLACE FUNCTION get_order_by_session(session_id_param TEXT)
RETURNS TABLE (
  id UUID,
  order_number TEXT,
  total_amount DECIMAL(12,2),
  currency TEXT,
  status TEXT,
  customer_email TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  is_guest BOOLEAN,
  created_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    o.id,
    o.order_number,
    o.total_amount,
    o.currency,
    o.status,
    o.customer_email,
    o.customer_name,
    o.customer_phone,
    o.shipping_address,
    o.billing_address,
    o.is_guest,
    o.created_at
  FROM orders o
  WHERE o.stripe_session_id = session_id_param
  AND (
    -- User owns the order
    (auth.uid() IS NOT NULL AND o.user_id = auth.uid()) OR
    -- It's a guest order (accessible to anyone)
    (o.is_guest = true AND o.user_id IS NULL)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to both authenticated and anonymous users
GRANT EXECUTE ON FUNCTION get_order_by_session TO anon, authenticated;

-- Create a function to safely get order items by order_id
CREATE OR REPLACE FUNCTION get_order_items_by_order(order_id_param UUID)
RETURNS TABLE (
  id UUID,
  product_name TEXT,
  variant TEXT,
  quantity INTEGER,
  unit_price DECIMAL(12,2),
  total_price DECIMAL(12,2),
  image_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    oi.id,
    oi.product_name,
    oi.variant,
    oi.quantity,
    oi.unit_price,
    oi.total_price,
    oi.image_url
  FROM order_items oi
  JOIN orders o ON o.id = oi.order_id
  WHERE oi.order_id = order_id_param
  AND (
    -- User owns the order
    (auth.uid() IS NOT NULL AND o.user_id = auth.uid()) OR
    -- It's a guest order (accessible to anyone)
    (o.is_guest = true AND o.user_id IS NULL)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to both authenticated and anonymous users
GRANT EXECUTE ON FUNCTION get_order_items_by_order TO anon, authenticated;

-- Add helpful comments
COMMENT ON FUNCTION get_order_by_session IS 'Safely retrieves order information by Stripe session ID for both authenticated users and guest orders';
COMMENT ON FUNCTION get_order_items_by_order IS 'Safely retrieves order items for both authenticated users and guest orders'; 