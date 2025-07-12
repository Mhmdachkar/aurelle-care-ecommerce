// Test email system with real order ID
import https from 'https';
import { readFileSync } from 'fs';

// Read environment variables
let supabaseUrl, serviceRoleKey;
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
  }
} catch (error) {
  console.error('❌ Error reading .env.local file:', error.message);
  process.exit(1);
}

// Test with the real order ID from database
async function testWithRealOrder() {
  console.log('🧪 Testing email system with real order...');
  
  const realOrderId = '7894aef4-6383-4f1a-8831-bf1f9c0fb338'; // From the test results
  
  const testOrderData = {
    orderId: realOrderId
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

    console.log('📤 Testing with real order ID:', realOrderId);
    console.log('📧 Expected recipient: Aurellecare28@gmail.com');

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
            console.log('✅ Email sent successfully!');
            console.log('📧 Check Aurellecare28@gmail.com for the order notification');
          } else {
            console.log('❌ Email sending failed:', parsed.error || parsed.message);
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

// Also test Resend API directly
async function testResendDirectly() {
  console.log('\n🧪 Testing Resend API directly...');
  
  let resendApiKey;
  try {
    const envContent = readFileSync('.env.local', 'utf8');
    const envLines = envContent.split('\n');
    
    for (const line of envLines) {
      if (line.startsWith('RESEND_API_KEY=')) {
        resendApiKey = line.split('=')[1].trim();
      }
    }
  } catch (error) {
    console.error('❌ Error reading .env.local file:', error.message);
    return;
  }

  const testEmail = {
    from: 'Aurelle Orders <orders@resend.dev>',
    to: ['Aurellecare28@gmail.com'],
    subject: '🧪 Test Email - Aurelle System Check',
    html: `
      <h1>✅ Email System Test</h1>
      <p>This is a test email to verify that your Aurelle email system is working correctly.</p>
      <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
      <p><strong>System:</strong> Aurelle E-commerce Platform</p>
      <p>If you receive this email, your notification system is working perfectly! 🎉</p>
    `
  };

  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(testEmail);
    
    const options = {
      hostname: 'api.resend.com',
      port: 443,
      path: '/emails',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      console.log('📊 Resend API Status Code:', res.statusCode);
      
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        console.log('📝 Resend API Response:', data);
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log('✅ Direct email test sent successfully!');
            console.log('📧 Email ID:', parsed.id);
            console.log('📧 Check Aurellecare28@gmail.com for the test email');
          } else {
            console.log('❌ Direct email test failed:', parsed.message);
          }
          resolve(parsed);
        } catch (e) {
          console.log('📄 Raw response:', data);
          resolve(data);
        }
      });
    });

    req.on('error', (error) => {
      console.error('🚫 Resend API request error:', error);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('🚀 Starting Real Email Tests...\n');
  
  try {
    // Test 1: Direct Resend API test
    await testResendDirectly();
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    
    // Test 2: Test with real order
    await testWithRealOrder();
    
    console.log('\n🎉 Email tests completed!');
    console.log('\n📧 Next Steps:');
    console.log('1. Check Aurellecare28@gmail.com for test emails');
    console.log('2. If emails received, system is working perfectly');
    console.log('3. Make a real purchase to test the full flow');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
  }
}

runTests(); 