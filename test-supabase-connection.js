// Test Supabase Connection
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });
config({ path: '.env' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...');
console.log('URL configured:', supabaseUrl ? '✅ YES' : '❌ NO');
console.log('Anon Key configured:', supabaseAnonKey ? '✅ YES' : '❌ NO');

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('❌ Missing environment variables');
  console.log('Please ensure your .env.local file contains:');
  console.log('VITE_SUPABASE_URL=https://orawqdebazuhqpkzufxy.supabase.co');
  console.log('VITE_SUPABASE_ANON_KEY=your_anon_key_here');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('\n🔄 Testing database connection...');
    
    // Test 1: Basic connectivity
    const { data, error } = await supabase
      .from('profiles')
      .select('count(*)')
      .limit(1);
    
    if (error) {
      console.log('❌ Database connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Database connection successful');
    
    // Test 2: Health check function
    console.log('\n🔄 Testing health check function...');
    const healthResponse = await fetch(`${supabaseUrl}/functions/v1/db-health-check`, {
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (healthResponse.ok) {
      const healthData = await healthResponse.json();
      console.log('✅ Health check successful:', healthData.status);
      console.log('📊 Database checks:', healthData.checks);
    } else {
      console.log('⚠️ Health check failed:', healthResponse.status, healthResponse.statusText);
    }
    
    // Test 3: Visitor tracking function
    console.log('\n🔄 Testing visitor tracking...');
    const sessionId = crypto.randomUUID();
    const trackResponse = await fetch(`${supabaseUrl}/functions/v1/track-visitor`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${supabaseAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        sessionId,
        pageUrl: 'http://localhost:5173/test',
        pageTitle: 'Connection Test',
        userAgent: 'Test Agent',
        referrer: ''
      })
    });
    
    if (trackResponse.ok) {
      const trackData = await trackResponse.json();
      console.log('✅ Visitor tracking successful');
      console.log('📝 Session created:', trackData.sessionCreated);
      console.log('🔍 Debug info:', trackData.debug);
    } else {
      const errorText = await trackResponse.text();
      console.log('⚠️ Visitor tracking failed:', trackResponse.status, errorText);
    }
    
    // Test 4: Check if tracking data was inserted
    console.log('\n🔄 Verifying data insertion...');
    const { data: sessionData, error: sessionError } = await supabase
      .from('visitor_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single();
    
    if (sessionError) {
      console.log('⚠️ Could not verify session data:', sessionError.message);
    } else {
      console.log('✅ Session data found in database');
      console.log('👤 Device:', sessionData.device_type, '| Browser:', sessionData.browser);
    }
    
    const { data: visitData, error: visitError } = await supabase
      .from('page_visits')
      .select('*')
      .eq('session_id', sessionId);
    
    if (visitError) {
      console.log('⚠️ Could not verify visit data:', visitError.message);
    } else {
      console.log('✅ Page visit data found:', visitData.length, 'records');
    }
    
    console.log('\n🎉 Supabase connection test completed successfully!');
    return true;
    
  } catch (error) {
    console.log('❌ Connection test failed:', error.message);
    return false;
  }
}

testConnection();
