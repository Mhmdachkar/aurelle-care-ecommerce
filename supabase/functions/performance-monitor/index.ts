import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface PerformanceMetric {
  metric_name: string;
  metric_value: number;
  metric_unit?: string;
  dimensions?: Record<string, any>;
}

interface PerformanceReport {
  session_id?: string;
  user_agent?: string;
  metrics: PerformanceMetric[];
  page_url?: string;
  timestamp: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 405,
      }
    )
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const requestData: PerformanceReport = await req.json()

    // Validate required fields
    if (!requestData.metrics || !Array.isArray(requestData.metrics)) {
      return new Response(
        JSON.stringify({ error: 'Invalid metrics data' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    // Get user IP and additional headers
    const userAgent = req.headers.get('user-agent') || requestData.user_agent
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown'

    // Process each performance metric
    const metricInserts = requestData.metrics.map(metric => ({
      metric_name: metric.metric_name,
      metric_value: metric.metric_value,
      metric_unit: metric.metric_unit || null,
      dimensions: {
        ...metric.dimensions,
        session_id: requestData.session_id,
        user_agent: userAgent,
        page_url: requestData.page_url,
        client_ip: clientIP,
        timestamp: requestData.timestamp || new Date().toISOString()
      }
    }))

    // Insert performance metrics into database
    const { error: insertError } = await supabaseClient
      .from('performance_metrics')
      .insert(metricInserts)

    if (insertError) {
      console.error('Failed to insert performance metrics:', insertError)
      return new Response(
        JSON.stringify({ error: 'Failed to save metrics' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        }
      )
    }

    // Calculate some aggregate metrics for real-time monitoring
    const aggregateMetrics = {
      total_metrics_recorded: metricInserts.length,
      session_id: requestData.session_id,
      page_url: requestData.page_url,
      timestamp: new Date().toISOString()
    }

    // Check for performance thresholds and alerts
    const alerts = []
    
    for (const metric of requestData.metrics) {
      // Check for slow page load times
      if (metric.metric_name === 'page_load_time' && metric.metric_value > 5000) {
        alerts.push({
          type: 'slow_page_load',
          message: `Slow page load detected: ${metric.metric_value}ms`,
          metric_name: metric.metric_name,
          metric_value: metric.metric_value
        })
      }

      // Check for high Time to First Byte (TTFB)
      if (metric.metric_name === 'ttfb' && metric.metric_value > 2000) {
        alerts.push({
          type: 'high_ttfb',
          message: `High TTFB detected: ${metric.metric_value}ms`,
          metric_name: metric.metric_name,
          metric_value: metric.metric_value
        })
      }

      // Check for high First Contentful Paint (FCP)
      if (metric.metric_name === 'fcp' && metric.metric_value > 3000) {
        alerts.push({
          type: 'high_fcp',
          message: `High FCP detected: ${metric.metric_value}ms`,
          metric_name: metric.metric_name,
          metric_value: metric.metric_value
        })
      }

      // Check for high Largest Contentful Paint (LCP)
      if (metric.metric_name === 'lcp' && metric.metric_value > 4000) {
        alerts.push({
          type: 'high_lcp',
          message: `High LCP detected: ${metric.metric_value}ms`,
          metric_name: metric.metric_name,
          metric_value: metric.metric_value
        })
      }

      // Check for high Cumulative Layout Shift (CLS)
      if (metric.metric_name === 'cls' && metric.metric_value > 0.25) {
        alerts.push({
          type: 'high_cls',
          message: `High CLS detected: ${metric.metric_value}`,
          metric_name: metric.metric_name,
          metric_value: metric.metric_value
        })
      }
    }

    // If there are alerts, log them or send notifications
    if (alerts.length > 0) {
      console.warn('Performance alerts detected:', alerts)
      
      // Here you could send alerts to monitoring services or notifications
      // For now, we'll just log them
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Performance metrics recorded successfully',
        aggregates: aggregateMetrics,
        alerts: alerts.length > 0 ? alerts : undefined
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Performance monitoring error:', error)
    
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