import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Waves, Droplets, Calendar, AlertCircle, CheckCircle } from 'lucide-react';

export default function IrrigationAdvisory() {
  const [schedule] = useState([
    { 
      day: 'Today', 
      date: 'Mar 31', 
      status: 'skip', 
      reason: 'Recent rainfall (25mm). Soil moisture adequate.',
      action: 'No irrigation needed'
    },
    { 
      day: 'Tomorrow', 
      date: 'Apr 1', 
      status: 'skip', 
      reason: 'Rain expected (15mm). Hold irrigation.',
      action: 'Monitor weather'
    },
    { 
      day: 'Apr 2', 
      date: 'Wednesday', 
      status: 'skip', 
      reason: 'Heavy rain forecasted (60mm).',
      action: 'No irrigation'
    },
    { 
      day: 'Apr 3', 
      date: 'Thursday', 
      status: 'irrigate', 
      reason: 'Soil moisture dropping. Good weather.',
      action: 'Light irrigation - 20mm',
      timing: 'Early morning (6-8 AM)'
    },
    { 
      day: 'Apr 4', 
      date: 'Friday', 
      status: 'skip', 
      reason: 'Soil moisture sufficient from previous irrigation.',
      action: 'Skip irrigation'
    },
    { 
      day: 'Apr 5', 
      date: 'Saturday', 
      status: 'irrigate', 
      reason: 'Crop water requirement increasing.',
      action: 'Normal irrigation - 25mm',
      timing: 'Evening (5-7 PM)'
    },
    { 
      day: 'Apr 6', 
      date: 'Sunday', 
      status: 'skip', 
      reason: 'Recent irrigation adequate.',
      action: 'No irrigation'
    },
  ]);

  const cropInfo = {
    crop: 'Tomato',
    stage: 'Flowering',
    area: '5 acres',
    waterRequirement: '25-30 mm/week',
    lastIrrigation: '2 days ago (Mar 29)',
    soilMoisture: '65%',
    method: 'Drip Irrigation'
  };

  const tips = [
    'Irrigate during early morning or late evening to reduce water loss',
    'Check soil moisture at root depth before irrigating',
    'Ensure proper drainage to prevent waterlogging',
    'Use drip irrigation for 40% water savings',
    'Adjust schedule based on crop growth stage and weather'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-cyan-600 p-3 rounded-lg">
          <Waves className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Irrigation Advisory</h1>
          <p className="text-gray-600">Smart irrigation schedule based on weather and crop needs</p>
        </div>
      </div>

      {/* Crop Info Card */}
      <Card className="bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5 text-cyan-600" />
            Current Crop Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Crop</p>
              <p className="text-lg font-bold text-gray-800">{cropInfo.crop}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Growth Stage</p>
              <p className="text-lg font-bold text-gray-800">{cropInfo.stage}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Area</p>
              <p className="text-lg font-bold text-gray-800">{cropInfo.area}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Method</p>
              <p className="text-lg font-bold text-gray-800">{cropInfo.method}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Soil Moisture</p>
              <p className="text-lg font-bold text-cyan-700">{cropInfo.soilMoisture}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Water Need</p>
              <p className="text-lg font-bold text-gray-800">{cropInfo.waterRequirement}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-600">Last Irrigation</p>
              <p className="text-lg font-bold text-gray-800">{cropInfo.lastIrrigation}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Schedule */}
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-cyan-600" />
          7-Day Irrigation Schedule
        </h2>
        
        <div className="space-y-3">
          {schedule.map((day, index) => (
            <Card 
              key={index}
              className={`${
                day.status === 'irrigate' 
                  ? 'border-2 border-blue-500 bg-blue-50' 
                  : 'border border-gray-200'
              }`}
            >
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="text-center min-w-[80px]">
                      <p className="font-bold text-lg text-gray-800">{day.day}</p>
                      <p className="text-sm text-gray-500">{day.date}</p>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {day.status === 'irrigate' ? (
                          <Badge className="bg-blue-600">
                            <Droplets className="h-3 w-3 mr-1" />
                            Irrigate
                          </Badge>
                        ) : (
                          <Badge variant="secondary">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Skip
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-1">
                        <strong>Reason:</strong> {day.reason}
                      </p>
                      
                      <p className="text-sm font-semibold text-gray-800">
                        {day.action}
                      </p>
                      
                      {day.timing && (
                        <p className="text-xs text-blue-700 mt-1">
                          ⏰ Best time: {day.timing}
                        </p>
                      )}
                    </div>
                  </div>

                  {day.status === 'irrigate' && (
                    <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                      Set Reminder
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Water Saving Tips */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💧 Water Conservation Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-gray-700">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Alert */}
      <Card className="border-l-4 border-orange-500 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Important Notice</h3>
              <p className="text-sm text-gray-700">
                Heavy rainfall expected on Apr 2-3. Ensure proper field drainage and postpone irrigation. 
                Resume watering schedule from Apr 4 based on soil moisture levels.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Irrigation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Water Used (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-cyan-700">125 mm</p>
            <p className="text-sm text-gray-600 mt-1">25mm × 5 acres</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Rainwater Received</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-700">85 mm</p>
            <p className="text-sm text-gray-600 mt-1">Last 7 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Water Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700">40%</p>
            <p className="text-sm text-gray-600 mt-1">vs flood irrigation</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
