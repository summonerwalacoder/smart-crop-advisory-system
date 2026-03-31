import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Sprout, 
  Droplets, 
  Bug, 
  CloudRain, 
  TrendingUp, 
  Waves,
  AlertTriangle,
  CheckCircle,
  Bell,
  MapPin,
  Calendar
} from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [weather, setWeather] = useState({
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    rainfall: 'Light rain expected tomorrow'
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const quickActions = [
    { 
      title: 'Crop Recommendation', 
      icon: Sprout, 
      color: 'bg-green-500', 
      path: '/crop-recommendation',
      description: 'Get AI-powered crop suggestions'
    },
    { 
      title: 'Disease Detection', 
      icon: Bug, 
      color: 'bg-red-500', 
      path: '/disease-detection',
      description: 'Upload plant image for diagnosis'
    },
    { 
      title: 'Fertilizer Guide', 
      icon: Droplets, 
      color: 'bg-blue-500', 
      path: '/fertilizer',
      description: 'Optimize fertilizer usage'
    },
    { 
      title: 'Weather Forecast', 
      icon: CloudRain, 
      color: 'bg-sky-500', 
      path: '/weather',
      description: '7-day weather predictions'
    },
    { 
      title: 'Market Prices', 
      icon: TrendingUp, 
      color: 'bg-emerald-500', 
      path: '/market-prices',
      description: 'Real-time crop prices'
    },
    { 
      title: 'Irrigation Advisory', 
      icon: Waves, 
      color: 'bg-cyan-500', 
      path: '/irrigation',
      description: 'Smart watering schedule'
    },
  ];

  const alerts = [
    { 
      type: 'warning', 
      message: 'Heavy rainfall expected in next 48 hours',
      time: '2 hours ago'
    },
    { 
      type: 'info', 
      message: 'Tomato prices increased by 12% in local mandi',
      time: '5 hours ago'
    },
    { 
      type: 'success', 
      message: 'Your irrigation schedule updated successfully',
      time: '1 day ago'
    },
  ];

  const recommendations = [
    {
      title: 'Optimal Planting Time',
      description: 'Best time to plant wheat is approaching (Next 2 weeks)',
      status: 'pending'
    },
    {
      title: 'Fertilizer Application',
      description: 'Apply NPK fertilizer to your cotton crop this week',
      status: 'active'
    },
    {
      title: 'Pest Prevention',
      description: 'Monitor for aphids - high risk in your region',
      status: 'warning'
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg p-6 shadow-lg">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name || 'Farmer'}! 🌾
            </h1>
            <p className="text-green-100 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {user?.location || 'Location not set'}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-green-100 flex items-center gap-1 justify-end">
              <Calendar className="h-4 w-4" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Today's Weather */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CloudRain className="h-5 w-5 text-blue-600" />
            Today's Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Temperature</p>
              <p className="text-2xl font-bold text-blue-700">{weather.temp}°C</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Condition</p>
              <p className="text-lg font-semibold text-gray-700">{weather.condition}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Humidity</p>
              <p className="text-lg font-semibold text-gray-700">{weather.humidity}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Forecast</p>
              <p className="text-sm font-medium text-orange-600">{weather.rainfall}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full border-2 hover:border-green-300">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`${action.color} p-3 rounded-lg`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <CardDescription className="text-xs">{action.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Alerts & Recommendations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-500" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.type === 'warning' ? 'bg-orange-50 border-orange-500' :
                    alert.type === 'info' ? 'bg-blue-50 border-blue-500' :
                    'bg-green-50 border-green-500'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />}
                    {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                    {alert.type === 'info' && <Bell className="h-4 w-4 text-blue-500 mt-0.5" />}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sprout className="h-5 w-5 text-green-500" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm">{rec.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                    </div>
                    <Badge 
                      variant={rec.status === 'warning' ? 'destructive' : rec.status === 'active' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {rec.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Government Schemes CTA */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Check Government Schemes & Subsidies
              </h3>
              <p className="text-gray-600">
                Discover financial assistance programs available for your crops and location
              </p>
            </div>
            <Link to="/schemes">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Explore Schemes
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
