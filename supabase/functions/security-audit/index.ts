import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface SecurityEvent {
  event_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  user_id?: string;
  ip_address?: string;
  user_agent?: string;
  additional_data?: Record<string, any>;
}

interface SecurityAuditReport {
  events: SecurityEvent[];
  summary: {
    total_events: number;
    high_severity_events: number;
    critical_events: number;
    unique_ips: number;
    time_range: {
      start: string;
      end: string;
    };
  };
  recommendations: string[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const url = new URL(req.url)
    const action = url.searchParams.get('action') || 'audit'

    if (req.method === 'POST' && action === 'log') {
      // Log a security event
      const securityEvent: SecurityEvent = await req.json()
      
      // Validate required fields
      if (!securityEvent.event_type || !securityEvent.severity || !securityEvent.description) {
        return new Response(
          JSON.stringify({ error: 'Missing required fields' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        )
      }

      // Get additional request context
      const clientIP = req.headers.get('x-forwarded-for') || 
                       req.headers.get('x-real-ip') || 
                       securityEvent.ip_address || 
                       'unknown'
      
      const userAgent = req.headers.get('user-agent') || securityEvent.user_agent

      // Create analytics event for security tracking
      const { error: logError } = await supabaseClient
        .from('analytics_events')
        .insert({
          event_name: `security_${securityEvent.event_type}`,
          event_data: {
            ...securityEvent,
            ip_address: clientIP,
            user_agent: userAgent,
            timestamp: new Date().toISOString()
          },
          user_id: securityEvent.user_id || null,
          timestamp: new Date().toISOString()
        })

      if (logError) {
        console.error('Failed to log security event:', logError)
        return new Response(
          JSON.stringify({ error: 'Failed to log security event' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          }
        )
      }

      // For critical events, trigger immediate alerts
      if (securityEvent.severity === 'critical') {
        console.error('CRITICAL SECURITY EVENT:', securityEvent)
        // Here you would typically send alerts to monitoring systems
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Security event logged successfully',
          event_id: Date.now().toString() // Simple event ID
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )

    } else if (req.method === 'GET' && action === 'audit') {
      // Perform security audit
      const hoursBack = parseInt(url.searchParams.get('hours') || '24')
      const startTime = new Date(Date.now() - (hoursBack * 60 * 60 * 1000)).toISOString()
      const endTime = new Date().toISOString()

      // Get security-related analytics events
      const { data: securityEvents, error: eventsError } = await supabaseClient
        .from('analytics_events')
        .select('*')
        .like('event_name', 'security_%')
        .gte('timestamp', startTime)
        .lte('timestamp', endTime)
        .order('timestamp', { ascending: false })

      if (eventsError) {
        console.error('Failed to fetch security events:', eventsError)
        return new Response(
          JSON.stringify({ error: 'Failed to fetch security events' }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 500,
          }
        )
      }

      // Analyze events for security insights
      const events: SecurityEvent[] = (securityEvents || []).map(event => ({
        event_type: event.event_name.replace('security_', ''),
        severity: event.event_data?.severity || 'medium',
        description: event.event_data?.description || 'Security event',
        user_id: event.user_id,
        ip_address: event.event_data?.ip_address,
        user_agent: event.event_data?.user_agent,
        additional_data: event.event_data
      }))

      // Calculate summary statistics
      const highSeverityEvents = events.filter(e => e.severity === 'high' || e.severity === 'critical').length
      const criticalEvents = events.filter(e => e.severity === 'critical').length
      const uniqueIPs = new Set(events.map(e => e.ip_address).filter(Boolean)).size

      // Generate security recommendations
      const recommendations: string[] = []

      if (criticalEvents > 0) {
        recommendations.push('Immediate action required: Critical security events detected')
      }

      if (highSeverityEvents > 10) {
        recommendations.push('High number of security events detected - review access patterns')
      }

      if (uniqueIPs > 50) {
        recommendations.push('High number of unique IP addresses - monitor for unusual activity')
      }

      // Check for authentication patterns
      const authEvents = events.filter(e => e.event_type.includes('auth'))
      if (authEvents.length > 100) {
        recommendations.push('High authentication activity - monitor for brute force attacks')
      }

      // Check for payment security
      const paymentEvents = events.filter(e => e.event_type.includes('payment'))
      if (paymentEvents.length > 0) {
        recommendations.push('Payment security events detected - review transaction patterns')
      }

      if (recommendations.length === 0) {
        recommendations.push('No immediate security concerns detected')
      }

      const auditReport: SecurityAuditReport = {
        events: events.slice(0, 100), // Limit to last 100 events
        summary: {
          total_events: events.length,
          high_severity_events: highSeverityEvents,
          critical_events: criticalEvents,
          unique_ips: uniqueIPs,
          time_range: {
            start: startTime,
            end: endTime
          }
        },
        recommendations
      }

      return new Response(
        JSON.stringify(auditReport),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      )

    } else {
      return new Response(
        JSON.stringify({ error: 'Invalid action or method' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

  } catch (error) {
    console.error('Security audit error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
}) 