import { createClient } from '@supabase/supabase-js';

// Use your actual environment variables
const supabaseUrl = 'https://ynvbbbuccdsgkcdcjmsq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludmJiYnVjY2RzZ2tjZGNqbXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwNTk1NDEsImV4cCI6MjA1MTYzNTU0MX0.HtIHMOw7xBfADFVl-m4fVG2PztLb8b3GX6g4P-rfQMo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  console.log('Testing database connectivity...');
  
  try {
    // Test 1: Check if we can query the orders table
    console.log('\n1. Testing orders table access...');
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .limit(10);
    
    if (ordersError) {
      console.error('Orders table error:', ordersError);
    } else {
      console.log('Orders found:', orders?.length || 0);
      if (orders && orders.length > 0) {
        console.log('Sample order:', orders[0]);
      }
    }

    // Test 2: Check if we can query the order_items table
    console.log('\n2. Testing order_items table access...');
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .limit(10);
    
    if (itemsError) {
      console.error('Order items table error:', itemsError);
    } else {
      console.log('Order items found:', orderItems?.length || 0);
    }

    // Test 3: Check if we can query the payments table
    console.log('\n3. Testing payments table access...');
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .limit(10);
    
    if (paymentsError) {
      console.error('Payments table error:', paymentsError);
    } else {
      console.log('Payments found:', payments?.length || 0);
    }

    // Test 4: Check table structure
    console.log('\n4. Testing table structure...');
    const { data: tablesInfo, error: infoError } = await supabase
      .rpc('get_schema_info')
      .catch(() => {
        console.log('get_schema_info function not available');
        return { data: null, error: null };
      });

    if (infoError) {
      console.error('Schema info error:', infoError);
    } else if (tablesInfo) {
      console.log('Schema info available');
    }

  } catch (error) {
    console.error('Database test failed:', error);
  }
}

// Run the test
testDatabase(); 