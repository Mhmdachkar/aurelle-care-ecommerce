import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Eye, Clock, TrendingUp, Monitor, Smartphone } from "lucide-react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface VisitorStats {
  total_visitors: number;
  unique_visitors: number;
  returning_visitors: number;
  page_views: number;
  bounce_rate: number;
  avg_session_duration: number;
}

interface DeviceStats {
  device_type: string;
  count: number;
}

interface BrowserStats {
  browser: string;
  count: number;
}

const VisitorAnalytics = () => {
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [deviceStats, setDeviceStats] = useState<DeviceStats[]>([]);
  const [browserStats, setBrowserStats] = useState<BrowserStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch today's visitor stats
      const { data: todayStats, error: statsError } = await supabase
        .from('visitor_stats')
        .select('*')
        .eq('date', new Date().toISOString().split('T')[0])
        .single();

      if (statsError && statsError.code !== 'PGRST116') {
        throw statsError;
      }

      // Fetch device breakdown
      const { data: deviceData, error: deviceError } = await supabase
        .from('visitor_sessions')
        .select('device_type')
        .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString());

      if (deviceError) {
        throw deviceError;
      }

      // Fetch browser breakdown
      const { data: browserData, error: browserError } = await supabase
        .from('visitor_sessions')
        .select('browser')
        .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString());

      if (browserError) {
        throw browserError;
      }

      // Process device stats
      const deviceCounts = deviceData?.reduce((acc: Record<string, number>, session) => {
        const device = session.device_type || 'unknown';
        acc[device] = (acc[device] || 0) + 1;
        return acc;
      }, {}) || {};

      const deviceStatsArray = Object.entries(deviceCounts).map(([device, count]) => ({
        device_type: device,
        count: count as number,
      }));

      // Process browser stats
      const browserCounts = browserData?.reduce((acc: Record<string, number>, session) => {
        const browser = session.browser || 'unknown';
        acc[browser] = (acc[browser] || 0) + 1;
        return acc;
      }, {}) || {};

      const browserStatsArray = Object.entries(browserCounts).map(([browser, count]) => ({
        browser,
        count: count as number,
      }));

      setStats(todayStats || {
        total_visitors: 0,
        unique_visitors: 0,
        returning_visitors: 0,
        page_views: 0,
        bounce_rate: 0,
        avg_session_duration: 0,
      });
      setDeviceStats(deviceStatsArray);
      setBrowserStats(browserStatsArray);
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="gap-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.total_visitors || 0}</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.unique_visitors || 0}</div>
            <p className="text-xs text-muted-foreground">New visitors today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.page_views || 0}</div>
            <p className="text-xs text-muted-foreground">Total views today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatDuration(stats?.avg_session_duration || 0)}
            </div>
            <p className="text-xs text-muted-foreground">Time on site</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="devices" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="browsers">Browsers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="devices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>Visitor distribution by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {deviceStats.map((device) => (
                  <div key={device.device_type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {device.device_type === 'mobile' ? (
                        <Smartphone className="h-4 w-4" />
                      ) : (
                        <Monitor className="h-4 w-4" />
                      )}
                      <span className="capitalize">{device.device_type}</span>
                    </div>
                    <Badge variant="secondary">{device.count}</Badge>
                  </div>
                ))}
                {deviceStats.length === 0 && (
                  <p className="text-sm text-muted-foreground">No device data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="browsers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Browser Breakdown</CardTitle>
              <CardDescription>Visitor distribution by browser</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {browserStats.map((browser) => (
                  <div key={browser.browser} className="flex items-center justify-between">
                    <span>{browser.browser}</span>
                    <Badge variant="secondary">{browser.count}</Badge>
                  </div>
                ))}
                {browserStats.length === 0 && (
                  <p className="text-sm text-muted-foreground">No browser data available</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VisitorAnalytics; 