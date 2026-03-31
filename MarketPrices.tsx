import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { TrendingUp, TrendingDown, MapPin, Calendar, LineChart } from 'lucide-react';

export default function MarketPrices() {
  const [selectedCrop, setSelectedCrop] = useState('All');
  const [selectedMandi, setSelectedMandi] = useState('Local');
  
  const [marketData, setMarketData] = useState<any[]>([]);
  const [pricePredict, setPricePredict] = useState<any>(null);

  useEffect(() => {
    // Simulate market price data
    const prices = [
      { 
        crop: 'Wheat', 
        current: 2150, 
        yesterday: 2100, 
        change: 2.4, 
        min: 2000, 
        max: 2300,
        prediction: { week: 2200, month: 2350 },
        unit: '₹/quintal',
        demand: 'High'
      },
      { 
        crop: 'Rice', 
        current: 2800, 
        yesterday: 2850, 
        change: -1.8, 
        min: 2700, 
        max: 3000,
        prediction: { week: 2850, month: 2900 },
        unit: '₹/quintal',
        demand: 'Medium'
      },
      { 
        crop: 'Cotton', 
        current: 6200, 
        yesterday: 6000, 
        change: 3.3, 
        min: 5800, 
        max: 6500,
        prediction: { week: 6400, month: 6700 },
        unit: '₹/quintal',
        demand: 'High'
      },
      { 
        crop: 'Tomato', 
        current: 1800, 
        yesterday: 2100, 
        change: -14.3, 
        min: 1200, 
        max: 2500,
        prediction: { week: 1600, month: 1400 },
        unit: '₹/quintal',
        demand: 'Low'
      },
      { 
        crop: 'Onion', 
        current: 2200, 
        yesterday: 2150, 
        change: 2.3, 
        min: 1800, 
        max: 2600,
        prediction: { week: 2300, month: 2500 },
        unit: '₹/quintal',
        demand: 'Medium'
      },
      { 
        crop: 'Potato', 
        current: 1500, 
        yesterday: 1450, 
        change: 3.4, 
        min: 1200, 
        max: 1800,
        prediction: { week: 1550, month: 1650 },
        unit: '₹/quintal',
        demand: 'High'
      },
    ];

    setMarketData(prices);
  }, []);

  const filteredData = selectedCrop === 'All' 
    ? marketData 
    : marketData.filter(item => item.crop === selectedCrop);

  const handlePredictPrice = (crop: any) => {
    setPricePredict(crop);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-emerald-600 p-3 rounded-lg">
          <TrendingUp className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Market Prices</h1>
          <p className="text-gray-600">Real-time mandi prices and price predictions</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <MapPin className="h-5 w-5 text-gray-600" />
              <Select value={selectedMandi} onValueChange={setSelectedMandi}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Local">Local Mandi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore APMC</SelectItem>
                  <SelectItem value="Mumbai">Mumbai Market</SelectItem>
                  <SelectItem value="Delhi">Delhi Azadpur</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-sm text-gray-600 whitespace-nowrap">Filter Crop:</span>
              <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Crops</SelectItem>
                  <SelectItem value="Wheat">Wheat</SelectItem>
                  <SelectItem value="Rice">Rice</SelectItem>
                  <SelectItem value="Cotton">Cotton</SelectItem>
                  <SelectItem value="Tomato">Tomato</SelectItem>
                  <SelectItem value="Onion">Onion</SelectItem>
                  <SelectItem value="Potato">Potato</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              Updated: Today, 10:30 AM
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredData.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-xl">{item.crop}</CardTitle>
                  <p className="text-sm text-gray-500">{selectedMandi} Mandi</p>
                </div>
                <Badge 
                  variant={item.demand === 'High' ? 'default' : item.demand === 'Medium' ? 'secondary' : 'outline'}
                  className={item.demand === 'High' ? 'bg-green-600' : ''}
                >
                  {item.demand} Demand
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-gray-800">
                  ₹{item.current.toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">{item.unit}</p>
              </div>

              <div className={`flex items-center gap-2 text-sm font-semibold ${
                item.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {item.change >= 0 ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                <span>{Math.abs(item.change)}% vs yesterday</span>
              </div>

              <div className="pt-3 border-t space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Min (30 days):</span>
                  <span className="font-semibold">₹{item.min}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Max (30 days):</span>
                  <span className="font-semibold">₹{item.max}</span>
                </div>
              </div>

              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="sm"
                onClick={() => handlePredictPrice(item)}
              >
                <LineChart className="h-4 w-4 mr-2" />
                View Price Prediction
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Price Prediction Modal */}
      {pricePredict && (
        <Card className="border-2 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <LineChart className="h-6 w-6 text-blue-600" />
                  Price Prediction: {pricePredict.crop}
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">AI-powered LSTM model predictions</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setPricePredict(null)}
              >
                Close
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Current Price</p>
                <p className="text-2xl font-bold text-gray-800">
                  ₹{pricePredict.current}
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Next Week (Predicted)</p>
                <p className="text-2xl font-bold text-blue-700">
                  ₹{pricePredict.prediction.week}
                </p>
                <p className={`text-xs mt-1 ${
                  pricePredict.prediction.week > pricePredict.current ? 'text-green-600' : 'text-red-600'
                }`}>
                  {((pricePredict.prediction.week - pricePredict.current) / pricePredict.current * 100).toFixed(1)}%
                </p>
              </div>
              <div className="bg-white p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600 mb-1">Next Month (Predicted)</p>
                <p className="text-2xl font-bold text-indigo-700">
                  ₹{pricePredict.prediction.month}
                </p>
                <p className={`text-xs mt-1 ${
                  pricePredict.prediction.month > pricePredict.current ? 'text-green-600' : 'text-red-600'
                }`}>
                  {((pricePredict.prediction.month - pricePredict.current) / pricePredict.current * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-3">💡 Recommendation</h4>
              {pricePredict.prediction.month > pricePredict.current ? (
                <p className="text-green-700">
                  ✅ Prices are expected to <strong>increase</strong>. Consider holding your stock for better returns in the coming month.
                </p>
              ) : (
                <p className="text-orange-700">
                  ⚠️ Prices may <strong>decline</strong>. Consider selling soon to avoid potential losses.
                </p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                *Predictions are based on historical data and market trends. Actual prices may vary.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Insights & Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-700 mb-2">📈 Rising Prices</h4>
              <p className="text-sm text-gray-700">
                Cotton and Potato prices showing upward trend due to increased demand and limited supply.
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-2">📉 Falling Prices</h4>
              <p className="text-sm text-gray-700">
                Tomato prices declining due to surplus supply. Consider selling or processing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
