// Test using environment variables from .env.local
import https from 'https';
import { readFileSync } from 'fs';

// Read .env.local file
let supabaseUrl, anonKey;
try {
  const envContent = readFileSync('.env.local', 'utf8');
  const envLines = envContent.split('\n');
  
  for (const line of envLines) {
    if (line.startsWith('VITE_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1].trim();
    }
    if (line.startsWith('VITE_SUPABASE_ANON_KEY=')) {
      anonKey = line.split('=')[1].trim();
    }
  }
} catch (error) {
  console.error('❌ Error reading .env.local file:', error.message);
  process.exit(1);
}

if (!supabaseUrl || !anonKey) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env.local');
  process.exit(1);
}

console.log('🔧 Using Supabase URL:', supabaseUrl);
console.log('🔑 Using Anon Key:', anonKey.substring(0, 20) + '...');

function testDatabaseAccess() {
  const url = `${supabaseUrl}/rest/v1/orders?select=*&limit=5`;
  
  const options = {
    method: 'GET',
    headers: {
      'apikey': anonKey,
      'Authorization': `Bearer ${anonKey}`,
      'Content-Type': 'application/json'
    }
  };

  console.log('\n🔍 Testing database access...');

  const req = https.request(url, options, (res) => {
    console.log('📊 Status Code:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('📝 Response:', data);
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          console.log('✅ Database connection successful!');
          console.log('📊 Orders found:', parsed.length);
          if (parsed.length > 0) {
            console.log('📋 Sample order:', JSON.stringify(parsed[0], null, 2));
          } else {
            console.log('ℹ️  Database is ready but no orders yet (normal for fresh setup)');
          }
        } else if (parsed.message) {
          console.log('❌ Error:', parsed.message);
          if (parsed.hint) {
            console.log('💡 Hint:', parsed.hint);
          }
        }
      } catch (e) {
        console.log('❌ Failed to parse response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('🚫 Request error:', error);
  });

  req.end();
}

// Test order_items table as well
function testOrderItemsTable() {
  const url = `${supabaseUrl}/rest/v1/order_items?select=*&limit=3`;
  
  const options = {
    method: 'GET',
    headers: {
      'apikey': anonKey,
      'Authorization': `Bearer ${anonKey}`,
      'Content-Type': 'application/json'
    }
  };

  console.log('\n🔍 Testing order_items table...');

  const req = https.request(url, options, (res) => {
    console.log('📊 Order Items Status Code:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          console.log('✅ Order Items table accessible!');
          console.log('📊 Order items found:', parsed.length);
        } else if (parsed.message) {
          console.log('❌ Order Items Error:', parsed.message);
        }
      } catch (e) {
        console.log('❌ Failed to parse order items response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('🚫 Order Items request error:', error);
  });

  req.end();
}

// Test payments table
function testPaymentsTable() {
  const url = `${supabaseUrl}/rest/v1/payments?select=*&limit=3`;
  
  const options = {
    method: 'GET',
    headers: {
      'apikey': anonKey,
      'Authorization': `Bearer ${anonKey}`,
      'Content-Type': 'application/json'
    }
  };

  console.log('\n🔍 Testing payments table...');

  const req = https.request(url, options, (res) => {
    console.log('📊 Payments Status Code:', res.statusCode);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          console.log('✅ Payments table accessible!');
          console.log('📊 Payments found:', parsed.length);
        } else if (parsed.message) {
          console.log('❌ Payments Error:', parsed.message);
        }
      } catch (e) {
        console.log('❌ Failed to parse payments response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('🚫 Payments request error:', error);
  });

  req.end();
}

// Run all tests
testDatabaseAccess();
setTimeout(testOrderItemsTable, 1000);
setTimeout(testPaymentsTable, 2000); 