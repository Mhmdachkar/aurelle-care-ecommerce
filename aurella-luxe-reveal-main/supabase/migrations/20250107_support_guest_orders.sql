-- Migration to support guest orders
-- Date: 2025-01-07
-- Description: Allow guest users to place orders without authentication

-- Add is_guest column to track guest orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS is_guest BOOLEAN DEFAULT false;

-- Make user_id nullable to support guest orders
ALTER TABLE orders ALTER COLUMN user_id DROP NOT NULL;

-- Update RLS policies to support guest orders

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
DROP POLICY IF EXISTS "Users can view their order items" ON order_items;
DROP POLICY IF EXISTS "Users can insert their order items" ON order_items;
DROP POLICY IF EXISTS "Users can view their payments" ON payments;

-- Create new policies that support both authenticated users and guests

-- Orders policies
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (is_guest = true)
  );

CREATE POLICY "Anyone can insert orders" ON orders
  FOR INSERT WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (is_guest = true AND user_id IS NULL)
  );

CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (is_guest = true)
  );

-- Order items policies
CREATE POLICY "Users can view order items" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (
        (orders.user_id = auth.uid()) OR
        (orders.is_guest = true)
      )
    )
  );

CREATE POLICY "Anyone can insert order items" ON order_items
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = order_items.order_id 
      AND (
        (orders.user_id = auth.uid()) OR
        (orders.is_guest = true)
      )
    )
  );

-- Payments policies
CREATE POLICY "Users can view payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payments.order_id 
      AND (
        (orders.user_id = auth.uid()) OR
        (orders.is_guest = true)
      )
    )
  );

CREATE POLICY "Anyone can insert payments" ON payments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders 
      WHERE orders.id = payments.order_id 
      AND (
        (orders.user_id = auth.uid()) OR
        (orders.is_guest = true)
      )
    )
  );

-- Add index for is_guest column for performance
CREATE INDEX IF NOT EXISTS idx_orders_is_guest ON orders(is_guest);

-- Add comment to document the guest order functionality
COMMENT ON COLUMN orders.is_guest IS 'Indicates if this order was placed by a guest user without authentication';
COMMENT ON COLUMN orders.user_id IS 'References auth.users(id). NULL for guest orders, required for authenticated user orders'; 