-- Add phone number field to orders table
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_phone TEXT;

-- Add email sent tracking
ALTER TABLE orders ADD COLUMN IF NOT EXISTS notification_sent BOOLEAN DEFAULT FALSE;

-- Create customer information extraction function
CREATE OR REPLACE FUNCTION extract_customer_info(
  session_data JSONB
) RETURNS JSONB AS $$
DECLARE
  customer_info JSONB := '{}';
BEGIN
  -- Extract customer details
  IF session_data ? 'customer_details' THEN
    customer_info := customer_info || jsonb_build_object(
      'name', COALESCE(session_data->'customer_details'->>'name', ''),
      'email', COALESCE(session_data->'customer_details'->>'email', ''),
      'phone', COALESCE(session_data->'customer_details'->>'phone', '')
    );
  END IF;
  
  -- Extract shipping address
  IF session_data ? 'shipping_details' THEN
    customer_info := customer_info || jsonb_build_object(
      'shipping_address', session_data->'shipping_details'->'address'
    );
  END IF;
  
  -- Extract billing address  
  IF session_data->'customer_details' ? 'address' THEN
    customer_info := customer_info || jsonb_build_object(
      'billing_address', session_data->'customer_details'->'address'
    );
  END IF;
  
  RETURN customer_info;
END;
$$ LANGUAGE plpgsql;

-- Add index for phone number searches
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_notification_sent ON orders(notification_sent);

-- Add better email indexing
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);

-- Update RLS policies to include new fields
-- (The existing policies already cover the new fields as they're part of the same table) 