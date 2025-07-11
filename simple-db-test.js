// Simple database test
const https = require('https');

const supabaseUrl = 'https://ynvbbbuccdsgkcdcjmsq.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InludmJiYnVjY2RzZ2tjZGNqbXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYwNTk1NDEsImV4cCI6MjA1MTYzNTU0MX0.HtIHMOw7xBfADFVl-m4fVG2PztLb8b3GX6g4P-rfQMo';

function testTableAccess() {
  const url = `${supabaseUrl}/rest/v1/orders?select=*&limit=5`;
  
  const options = {
    method: 'GET',
    headers: {
      'apikey': anonKey,
      'Authorization': `Bearer ${anonKey}`,
      'Content-Type': 'application/json'
    }
  };

  console.log('Testing database access...');
  console.log('URL:', url);

  const req = https.request(url, options, (res) => {
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Response:', data);
      try {
        const parsed = JSON.parse(data);
        console.log('Orders found:', parsed.length || 0);
        if (parsed.length > 0) {
          console.log('Sample order:', parsed[0]);
        }
      } catch (e) {
        console.log('Response is not JSON:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.error('Request error:', error);
  });

  req.end();
}

testTableAccess(); 