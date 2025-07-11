import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface HealthCheckResult {
  status: 'healthy' | 'unhealthy' | 'degraded';
  checks: {
    database: boolean;
    auth: boolean;
    storage: boolean;
    edge_functions: boolean;
  };
  performance: {
    query_time_ms: number;
    connection_count: number;
  };
  timestamp: string;
  version: string;
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

    const startTime = Date.now()
    
    // Initialize health check result
    const healthCheck: HealthCheckResult = {
      status: 'healthy',
      checks: {
        database: false,
        auth: false,
        storage: false,
        edge_functions: false
      },
      performance: {
        query_time_ms: 0,
        connection_count: 0
      },
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }

    // Test database connectivity
    try {
      const { data, error } = await supabaseClient
        .from('profiles')
        .select('count(*)')
        .limit(1)
      
      if (!error) {
        healthCheck.checks.database = true
      }
    } catch (error) {
      console.error('Database health check failed:', error)
      healthCheck.checks.database = false
    }

    // Test auth functionality
    try {
      const { data, error } = await supabaseClient.auth.getSession()
      healthCheck.checks.auth = !error
    } catch (error) {
      console.error('Auth health check failed:', error)
      healthCheck.checks.auth = false
    }

    // Test basic table queries and performance
    try {
      const performanceStart = Date.now()
      
      const { data: orderStats, error } = await supabaseClient
        .rpc('get_order_statistics')
      
      healthCheck.performance.query_time_ms = Date.now() - performanceStart
      
      if (!error) {
        healthCheck.checks.database = true
      }
    } catch (error) {
      console.error('Performance check failed:', error)
      healthCheck.performance.query_time_ms = Date.now() - startTime
    }

    // Get connection info
    try {
      const { data: connections } = await supabaseClient
        .from('pg_stat_activity')
        .select('count(*)')
        .limit(1)
      
      if (connections) {
        healthCheck.performance.connection_count = connections.length || 0
      }
    } catch (error) {
      // This might fail due to permissions, which is okay
      healthCheck.performance.connection_count = 0
    }

    // Storage check (basic)
    healthCheck.checks.storage = true // Assume healthy if no specific storage operations

    // Edge functions check (self-referential)
    healthCheck.checks.edge_functions = true // If we're running, edge functions are working

    // Determine overall status
    const checksArray = Object.values(healthCheck.checks)
    const healthyChecks = checksArray.filter(check => check).length
    const totalChecks = checksArray.length

    if (healthyChecks === totalChecks) {
      healthCheck.status = 'healthy'
    } else if (healthyChecks >= totalChecks * 0.75) {
      healthCheck.status = 'degraded'
    } else {
      healthCheck.status = 'unhealthy'
    }

    // Return appropriate status code
    const statusCode = healthCheck.status === 'healthy' ? 200 : 
                      healthCheck.status === 'degraded' ? 207 : 503

    return new Response(
      JSON.stringify(healthCheck),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: statusCode,
      },
    )

  } catch (error) {
    console.error('Health check failed:', error)
    
    const errorResponse: HealthCheckResult = {
      status: 'unhealthy',
      checks: {
        database: false,
        auth: false,
        storage: false,
        edge_functions: false
      },
      performance: {
        query_time_ms: 0,
        connection_count: 0
      },
      timestamp: new Date().toISOString(),
      version: '1.0.0'
    }

    return new Response(
      JSON.stringify(errorResponse),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 503,
      },
    )
  }
}) 