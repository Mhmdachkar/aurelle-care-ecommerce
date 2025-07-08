-- Add image_url column to cart_items table
ALTER TABLE public.cart_items 
ADD COLUMN image_url TEXT;