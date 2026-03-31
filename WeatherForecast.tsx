import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  CloudRain, 
  Sun, 
  Cloud, 
  CloudDrizzle, 
  Wind, 
  Droplets, 
  AlertTriangle,
  ThermometerSun
} from 'lucide-react';

export default function WeatherForecast() {
  const [forecast, setForecast] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // Simulate weather API data
    const weatherData = [
      { day: 'Today', date: 'Mar 31', temp: { max: 32, min: 22 }, condition: 'Partly Cloudy', rain: 20, humidity: 65, wind: 12 },
      { day: 'Tomorrow', date: 'Apr 1', temp: { max: 30, min: 21 }, condition: 'Light Rain', rain: 70, humidity: 75, wind: 15 },
      { day: 'Wed', date: 'Apr 2', temp: { max: 28, min: 20 }, condition: 'Heavy Rain', rain: 90, humidity: 85, wind: 20 },
      { day: 'Thu', date: 'Apr 3', temp: { max: 29, min: 21 }, condition: 'Cloudy', rain: 40, humidity: 70, wind: 10 },
      { day: 'Fri', date: 'Apr 4', temp: { max: 31, min: 22 }, condition: 'Sunny', rain: 10, humidity: 60, wind: 8 },
      { day: 'Sat', date: 'Apr 5', temp: { max: 33, min: 23 }, condition: 'Sunny', rain: 5, humidity: 55, wind: 9 },
      { day: 'Sun', date: 'Apr 6', temp: { max: 32, min: 22 }, condition: 'Partly Cloudy', rain: 15, humidity: 60, wind: 11 },
    ];

    const weatherAlerts = [
      { type: 'warning', title: 'Heavy Rainfall Alert', message: 'Expect 50-80mm rainfall on Apr 2-3. Postpone irrigation and pesticide spraying.', icon: CloudRain },
      { type: 'info', title: 'Favorable Conditions', message: 'Good weather for fertilizer application from Apr 4-6.', icon: Sun },
      { type: 'caution', title: 'High Humidity', message: 'Increased risk of fungal diseases. Monitor crops closely.', icon: Droplets },
    ];

    setForecast(weatherData);
    setAlerts(weatherAlerts);
  }, []);

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'Sunny':
        return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'Partly Cloudy':
        return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'Cloudy':
        return <Cloud className="h-8 w-8 text-gray-600" />;
      case 'Light Rain':
        return <CloudDrizzle className="h-8 w-8 text-blue-500" />;
      case 'Heavy Rain':
        return <CloudRain className="h-8 w-8 text-blue-700" />;
      default:
        return <Cloud className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-sky-600 p-3 rounded-lg">
          <CloudRain className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Weather Forecast</h1>
          <p className="text-gray-600">7-day weather predictions and farming alerts</p>
        </div>
      </div>

      {/* Weather Alerts */}
      <div className="space-y-3">
        {alerts.map((alert, index) => (
          <Card 
            key={index}
            className={`border-l-4 ${
              alert.type === 'warning' ? 'border-orange-500 bg-orange-50' :
              alert.type === 'info' ? 'border-blue-500 bg-blue-50' :
              'border-yellow-500 bg-yellow-50'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white rounded-lg">
                  <alert.icon className={`h-6 w-6 ${
                    alert.type === 'warning' ? 'text-orange-500' :
                    alert.type === 'info' ? 'text-blue-500' :
                    'text-yellow-500'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{alert.title}</h3>
                  <p className="text-sm text-gray-700">{alert.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 7-Day Forecast */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800">7-Day Forecast</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {forecast.map((day, index) => (
            <Card 
              key={index}
              className={`${index === 0 ? 'border-2 border-blue-500' : ''} hover:shadow-lg transition-shadow`}
            >
              <CardHeader className="pb-3">
                <div className="text-center">
                  <p className="font-bold text-lg">{day.day}</p>
                  <p className="text-sm text-gray-500">{day.date}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-center">
                  {getWeatherIcon(day.condition)}
                </div>
                <p className="text-center text-sm font-medium text-gray-700">
                  {day.condition}
                </p>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-800">
                    {day.temp.max}°
                  </p>
                  <p className="text-sm text-gray-500">
                    Low: {day.temp.min}°
                  </p>
                </div>
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      <CloudRain className="h-4 w-4 text-blue-500" />
                      Rain
                    </span>
                    <span className="font-semibold">{day.rain}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Droplets className="h-4 w-4 text-cyan-500" />
                      Humidity
                    </span>
                    <span className="font-semibold">{day.humidity}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 text-gray-600">
                      <Wind className="h-4 w-4 text-gray-500" />
                      Wind
                    </span>
                    <span className="font-semibold">{day.wind} km/h</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Farming Recommendations */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ThermometerSun className="h-5 w-5 text-green-600" />
            Weather-Based Farming Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">✅ Recommended Activities</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Apply fertilizers on Apr 4-6 (dry weather expected)</li>
                <li>• Harvest ready crops before Apr 2 rainfall</li>
                <li>• Prepare drainage channels for heavy rain</li>
              </ul>
            </div>
            <div className="p-4 bg-white rounded-lg">
              <h4 className="font-semibold text-red-700 mb-2">❌ Avoid These Activities</h4>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• No irrigation needed for next 3 days</li>
                <li>• Postpone pesticide spraying until Apr 4</li>
                <li>• Delay new plantings until after rain period</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
