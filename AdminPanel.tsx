import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Users, 
  Activity, 
  Database, 
  Settings, 
  TrendingUp,
  RefreshCw,
  Download
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

export default function AdminPanel() {
  const [users] = useState([
    { id: 1, name: 'Farmer Kumar', phone: '9876543210', location: 'Karnataka', status: 'Active', joined: '2024-01-15' },
    { id: 2, name: 'Farmer Singh', phone: '9876543211', location: 'Punjab', status: 'Active', joined: '2024-02-20' },
    { id: 3, name: 'Farmer Reddy', phone: '9876543212', location: 'Andhra Pradesh', status: 'Active', joined: '2024-03-10' },
    { id: 4, name: 'Farmer Patil', phone: '9876543213', location: 'Maharashtra', status: 'Inactive', joined: '2024-01-05' },
  ]);

  const stats = {
    totalUsers: 1247,
    activeToday: 342,
    predictions: 5678,
    diseaseScans: 892,
    avgAccuracy: 89.5
  };

  const recentActivity = [
    { user: 'Farmer Kumar', action: 'Crop Recommendation', time: '5 mins ago', status: 'success' },
    { user: 'Farmer Singh', action: 'Disease Detection', time: '12 mins ago', status: 'success' },
    { user: 'Farmer Reddy', action: 'Market Price Check', time: '18 mins ago', status: 'success' },
    { user: 'Farmer Patil', action: 'Fertilizer Advisory', time: '25 mins ago', status: 'success' },
    { user: 'Farmer Kumar', action: 'Weather Forecast', time: '30 mins ago', status: 'success' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-purple-600 p-3 rounded-lg">
            <Settings className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">System monitoring and management</p>
          </div>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-800">{stats.totalUsers.toLocaleString()}</p>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">↑ 12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-800">{stats.activeToday}</p>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">27% of total users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Predictions Made</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-800">{stats.predictions.toLocaleString()}</p>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">↑ 8% this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Disease Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-800">{stats.diseaseScans}</p>
              <Database className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Avg Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-3xl font-bold text-gray-800">{stats.avgAccuracy}%</p>
              <Settings className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-green-600 mt-2">↑ 2% improvement</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2" />
            Users
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="h-4 w-4 mr-2" />
            Recent Activity
          </TabsTrigger>
          <TabsTrigger value="models">
            <Database className="h-4 w-4 mr-2" />
            ML Models
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Registered Users</CardTitle>
                  <CardDescription>Manage farmer accounts and access</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.id}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.location}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joined}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent System Activity</CardTitle>
              <CardDescription>Real-time user actions and system events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-gray-800">{activity.user}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{activity.time}</p>
                      <Badge variant="outline" className="text-xs">
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ML Models Tab */}
        <TabsContent value="models">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Crop Recommendation Model</CardTitle>
                <CardDescription>Random Forest Classifier</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-bold text-green-700">92.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-semibold">Mar 15, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Predictions:</span>
                  <span className="font-semibold">3,421</span>
                </div>
                <Button className="w-full" variant="outline">Retrain Model</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Disease Detection Model</CardTitle>
                <CardDescription>CNN - ResNet50</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-bold text-green-700">88.7%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-semibold">Mar 20, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Images Processed:</span>
                  <span className="font-semibold">892</span>
                </div>
                <Button className="w-full" variant="outline">Update Dataset</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Price Prediction Model</CardTitle>
                <CardDescription>LSTM Time Series</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">MAE:</span>
                  <span className="font-bold text-green-700">125.4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-semibold">Mar 28, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Predictions Made:</span>
                  <span className="font-semibold">1,365</span>
                </div>
                <Button className="w-full" variant="outline">Refresh Data</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Fertilizer Optimizer</CardTitle>
                <CardDescription>Decision Tree Model</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Accuracy:</span>
                  <span className="font-bold text-green-700">90.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-semibold">Mar 10, 2026</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Recommendations:</span>
                  <span className="font-semibold">2,104</span>
                </div>
                <Button className="w-full" variant="outline">Configure</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">API Keys Status</label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weather API</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Market Data API</span>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                  </div>
                </div>
                <Button className="w-full">Update Configuration</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Database Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Records:</span>
                  <span className="font-bold">12,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Storage Used:</span>
                  <span className="font-bold">2.3 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Backup:</span>
                  <span className="font-bold">2 hours ago</span>
                </div>
                <Button className="w-full" variant="outline">Backup Now</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
