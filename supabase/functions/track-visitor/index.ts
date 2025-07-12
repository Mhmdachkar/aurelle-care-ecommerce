import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('=== Track Visitor Function Started ===');
  console.log('Method:', req.method);
  console.log('Headers:', Object.fromEntries(req.headers.entries()));
  
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Getting environment variables...');
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    console.log('Supabase URL:', supabaseUrl ? 'SET' : 'NOT SET');
    console.log('Service Key:', supabaseServiceKey ? 'SET' : 'NOT SET');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Missing environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
    }

    console.log('Creating Supabase client...');
    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Parsing request body...');
    const requestBody = await req.json();
    console.log('Request body:', requestBody);
    
    const { sessionId, pageUrl, pageTitle, userAgent, referrer } = requestBody;
    
    if (!sessionId || !pageUrl || !userAgent) {
      throw new Error('Missing required fields: sessionId, pageUrl, or userAgent');
    }
    
    // Get IP address
    const rawIpAddress = req.headers.get('x-forwarded-for') || 
                        req.headers.get('x-real-ip') || 
                        'unknown';

    // Parse IP address - handle multiple IPs from proxy chains
    let ipAddress = 'unknown';
    if (rawIpAddress && rawIpAddress !== 'unknown') {
      // Take the first IP address from the comma-separated list
      const ips = rawIpAddress.split(',').map(ip => ip.trim());
      // Use the first non-private IP address, or the first one if all are private
      ipAddress = ips.find(ip => !isPrivateIP(ip)) || ips[0] || 'unknown';
    }

    console.log('Raw IP Address:', rawIpAddress);
    console.log('Parsed IP Address:', ipAddress);

    // Parse user agent for device info
    const deviceInfo = parseUserAgent(userAgent);
    console.log('Device info:', deviceInfo);
    
    // Check if this is a returning visitor
    console.log('Checking for existing session...');
    const { data: existingSession, error: checkError } = await supabaseClient
      .from('visitor_sessions')
      .select('session_id')
      .eq('session_id', sessionId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing session:', checkError);
      throw checkError;
    }

    const isReturningVisitor = !!existingSession;
    console.log('Is returning visitor:', isReturningVisitor);

    // Create or update visitor session
    if (!existingSession) {
      console.log('Creating new visitor session...');
      const sessionData = {
        session_id: sessionId,
        ip_address: ipAddress,
        user_agent: userAgent,
        device_type: deviceInfo.device,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        referrer: referrer,
        landing_page: pageUrl,
        is_returning_visitor: isReturningVisitor,
      };
      
      console.log('Session data to insert:', sessionData);
      
      const { data: sessionResult, error: sessionError } = await supabaseClient
        .from('visitor_sessions')
        .insert(sessionData)
        .select();

      if (sessionError) {
        console.error('Error creating visitor session:', sessionError);
        throw sessionError;
      }
      
      console.log('Session created successfully:', sessionResult);
    } else {
      console.log('Session already exists, skipping creation');
    }

    // Track page visit
    console.log('Creating page visit...');
    const visitData = {
      session_id: sessionId,
      page_url: pageUrl,
      page_title: pageTitle,
    };
    
    console.log('Visit data to insert:', visitData);
    
    const { data: visitResult, error: visitError } = await supabaseClient
      .from('page_visits')
      .insert(visitData)
      .select();

    if (visitError) {
      console.error('Error tracking page visit:', visitError);
      throw visitError;
    }
    
    console.log('Page visit created successfully:', visitResult);
    console.log('=== Track Visitor Function Completed Successfully ===');

    return new Response(
      JSON.stringify({ 
        success: true, 
        sessionCreated: !existingSession,
        visitCreated: true,
        debug: {
          sessionId,
          deviceInfo,
          ipAddress
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('=== Track Visitor Function Error ===');
    console.error('Error type:', typeof error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.details || 'No additional details',
        hint: error.hint || 'No hint available'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});

function parseUserAgent(userAgent: string) {
  const device = /Mobile|Android|iPhone|iPad/.test(userAgent) ? 'mobile' : 'desktop';
  
  let browser = 'unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  
  let os = 'unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';
  
  return { device, browser, os };
}

function isPrivateIP(ip: string): boolean {
  // Check for private IP ranges
  const privateRanges = [
    /^10\./,                    // 10.0.0.0/8
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./,  // 172.16.0.0/12
    /^192\.168\./,              // 192.168.0.0/16
    /^127\./,                   // 127.0.0.0/8 (localhost)
    /^169\.254\./,              // 169.254.0.0/16 (link-local)
    /^::1$/,                    // IPv6 localhost
    /^fe80:/,                   // IPv6 link-local
    /^fc00:/,                   // IPv6 unique local
    /^fd00:/,                   // IPv6 unique local
  ];
  
  return privateRanges.some(range => range.test(ip));
} 