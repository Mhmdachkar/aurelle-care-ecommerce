// Test Resend email system
import https from 'https';
import { readFileSync } from 'fs';

// Read environment variables
let supabaseUrl, serviceRoleKey, resendApiKey;
try {
  const envContent = readFileSync('.env.local', 'utf8');
  const envLines = envContent.split('\n');
  
  for (const line of envLines) {
    if (line.startsWith('SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1].trim();
    }
    if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) {
      serviceRoleKey = line.split('=')[1].trim();
    }
    if (line.startsWith('RESEND_API_KEY=')) {
      resendApiKey = line.split('=')[1].trim();
    }
  }
} catch (error) {
  console.error('❌ Error reading .env.local file:', error.message);
  process.exit(1);
}

console.log('🔧 Email System Configuration Check:');
console.log('📧 Resend API Key:', resendApiKey ? '✅ Found' : '❌ Missing');
console.log('🌐 Supabase URL:', supabaseUrl ? '✅ Found' : '❌ Missing');
console.log('🔑 Service Role Key:', serviceRoleKey ? '✅ Found' : '❌ Missing');

// Test 1: Verify Resend API Key validity
async function testResendApiKey() {
  console.log('\n🧪 Test 1: Verifying Resend API Key...');
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.resend.com',
      port: 443,
      path: '/domains',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      console.log('📊 Resend API Status Code:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log('✅ Resend API Key is valid!');
            console.log('📧 Available domains:', parsed.data?.length || 0);
          } else {
            console.log('❌ Resend API Key validation failed:', parsed.message);
          }
          resolve(parsed);
        } catch (e) {
          console.log('❌ Failed to parse Resend response:', data);
          reject(e);
        }
      });
    });

    req.on('error', (error) => {
      console.error('🚫 Resend API request error:', error);
      reject(error);
    });

    req.end();
  });
}

// Test 2: Test send-order-notification function
async function testEmailFunction() {
  console.log('\n🧪 Test 2: Testing send-order-notification function...');
  
  // Create a mock order for testing
  const testOrderData = {
    orderId: 'test-order-123'
  };

  return new Promise((resolve, reject) => {
    const url = `${supabaseUrl}/functions/v1/send-order-notification`;
    const postData = JSON.stringify(testOrderData);
    
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    console.log('📤 Testing email function at:', url);

    const req = https.request(url, options, (res) => {
      console.log('📊 Email Function Status Code:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('📝 Email Function Response:', data);
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log('✅ Email function is accessible!');
          } else {
            console.log('⚠️ Email function response:', parsed.error || parsed.message);
          }
          resolve(parsed);
        } catch (e) {
          console.log('📄 Raw response:', data);
          resolve(data);
        }
      });
    });

    req.on('error', (error) => {
      console.error('🚫 Email function request error:', error);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Test 3: Check if we can create a test order in database
async function testDatabaseConnection() {
  console.log('\n🧪 Test 3: Testing database connection for orders...');
  
  return new Promise((resolve, reject) => {
    const url = `${supabaseUrl}/rest/v1/orders?select=id,order_number,customer_email&limit=1`;
    
    const options = {
      method: 'GET',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(url, options, (res) => {
      console.log('📊 Database Status Code:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log('✅ Database connection successful!');
            console.log('📊 Sample orders found:', Array.isArray(parsed) ? parsed.length : 0);
            if (Array.isArray(parsed) && parsed.length > 0) {
              console.log('📋 Latest order:', parsed[0]);
            }
          } else {
            console.log('❌ Database connection failed:', parsed.message);
          }
          resolve(parsed);
        } catch (e) {
          console.log('❌ Failed to parse database response:', data);
          reject(e);
        }
      });
    });

    req.on('error', (error) => {
      console.error('🚫 Database request error:', error);
      reject(error);
    });

    req.end();
  });
}

// Run all tests
async function runEmailTests() {
  console.log('🚀 Starting Email System Tests...\n');
  
  try {
    await testResendApiKey();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    
    await testDatabaseConnection();
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
    
    await testEmailFunction();
    
    console.log('\n🎉 Email system tests completed!');
    console.log('\n📧 Expected Email Flow:');
    console.log('1. Customer completes purchase');
    console.log('2. Stripe webhook triggers');
    console.log('3. Order updated in database');
    console.log('4. send-order-notification called');
    console.log('5. Email sent to Aurellecare28@gmail.com');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
  }
}

runEmailTests(); 