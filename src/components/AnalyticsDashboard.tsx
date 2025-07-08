import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, Users, ShoppingCart, DollarSign, TrendingUp, Eye } from 'lucide-react';

// This component shows what analytics data you would have access to
const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState('7days');

  // Mock data - replace with real analytics API calls
  const mockData = {
    overview: {
      totalSessions: 1247,
      totalUsers: 934,
      pageViews: 3421,
      totalRevenue: 15420.50,
      conversionRate: 3.2,
      avgSessionDuration: '2m 34s'
    },
    topPages: [
      { url: '/', title: 'Home Page', views: 1250, sessions: 800 },
      { url: '/product', title: 'Product Page', views: 890, sessions: 650 },
      { url: '/checkout', title: 'Checkout', views: 120, sessions: 98 },
      { url: '/success', title: 'Order Success', views: 45, sessions: 45 },
    ],
    recentSessions: [
      { id: 1, userId: 'user_123', startTime: '2025-01-08 14:30', duration: '3m 45s', pages: 5, converted: true },
      { id: 2, userId: 'guest_456', startTime: '2025-01-08 14:25', duration: '1m 20s', pages: 2, converted: false },
      { id: 3, userId: 'user_789', startTime: '2025-01-08 14:20', duration: '8m 15s', pages: 12, converted: true },
    ],
    salesData: [
      { date: '2025-01-08', orders: 12, revenue: 1240.50 },
      { date: '2025-01-07', orders: 8, revenue: 890.00 },
      { date: '2025-01-06', orders: 15, revenue: 1650.75 },
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Track your website performance and user behavior</p>
        </div>
        <select 
          value={dateRange} 
          onChange={(e) => setDateRange(e.target.value)}
          className="border rounded-md px-3 py-2"
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
        </select>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.totalSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.pageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${mockData.overview.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+23% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.overview.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">+0.3% from last period</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pages">Top Pages</TabsTrigger>
          <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
          <TabsTrigger value="sales">Sales Data</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Session Overview</CardTitle>
                <CardDescription>User engagement metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Avg Session Duration:</span>
                    <span className="font-medium">{mockData.overview.avgSessionDuration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Users:</span>
                    <span className="font-medium">{mockData.overview.totalUsers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bounce Rate:</span>
                    <span className="font-medium">34.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Direct:</span>
                    <span className="font-medium">45%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Google Search:</span>
                    <span className="font-medium">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Social Media:</span>
                    <span className="font-medium">18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span className="font-medium">9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Pages</CardTitle>
              <CardDescription>Most visited pages on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.topPages.map((page, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{page.title}</div>
                      <div className="text-sm text-muted-foreground">{page.url}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{page.views} views</div>
                      <div className="text-sm text-muted-foreground">{page.sessions} sessions</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sessions</CardTitle>
              <CardDescription>Live user activity on your site</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">Session {session.id}</div>
                      <div className="text-sm text-muted-foreground">
                        User: {session.userId} • Started: {session.startTime}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{session.duration}</div>
                      <div className="text-sm text-muted-foreground">
                        {session.pages} pages • {session.converted ? '✅ Converted' : '❌ No conversion'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales</CardTitle>
              <CardDescription>Orders and revenue breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockData.salesData.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{day.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{day.orders} orders</div>
                      <div className="text-sm text-muted-foreground">${day.revenue.toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard; 