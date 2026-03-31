import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Sprout, Loader2, TrendingUp, Droplets, ThermometerSun, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export default function CropRecommendation() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    soilType: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    ph: '',
    rainfall: '',
    temperature: '',
    humidity: '',
    state: '',
    district: ''
  });

  const soilTypes = [
    'Sandy', 'Loamy', 'Clay', 'Silt', 'Peaty', 'Chalky', 'Red', 'Black', 'Alluvial', 'Laterite'
  ];

  const states = [
    'Karnataka', 'Maharashtra', 'Punjab', 'Uttar Pradesh', 'Tamil Nadu', 
    'Gujarat', 'Rajasthan', 'Madhya Pradesh', 'Andhra Pradesh', 'West Bengal'
  ];

  const handleSubmit = async () => {
    // Validate form
    if (!formData.soilType || !formData.state) {
      toast.error('Please fill in required fields');
      return;
    }

    setLoading(true);

    // Simulate ML model prediction
    setTimeout(() => {
      // Demo recommendations based on soil type
      const recommendations = {
        'Sandy': [
          { name: 'Groundnut', score: 92, season: 'Kharif', duration: '110-120 days', yield: '1.5-2 tons/acre' },
          { name: 'Watermelon', score: 88, season: 'Summer', duration: '80-90 days', yield: '8-10 tons/acre' },
          { name: 'Millet', score: 85, season: 'Kharif', duration: '70-90 days', yield: '800-1000 kg/acre' }
        ],
        'Loamy': [
          { name: 'Wheat', score: 95, season: 'Rabi', duration: '120-150 days', yield: '2-2.5 tons/acre' },
          { name: 'Cotton', score: 91, season: 'Kharif', duration: '150-180 days', yield: '300-400 kg/acre' },
          { name: 'Sugarcane', score: 89, season: 'Year-round', duration: '10-12 months', yield: '30-35 tons/acre' }
        ],
        'Clay': [
          { name: 'Rice', score: 94, season: 'Kharif', duration: '120-150 days', yield: '2.5-3 tons/acre' },
          { name: 'Soybean', score: 87, season: 'Kharif', duration: '90-120 days', yield: '800-1000 kg/acre' },
          { name: 'Mustard', score: 84, season: 'Rabi', duration: '90-110 days', yield: '600-800 kg/acre' }
        ],
        'Black': [
          { name: 'Cotton', score: 96, season: 'Kharif', duration: '150-180 days', yield: '400-500 kg/acre' },
          { name: 'Jowar', score: 90, season: 'Kharif/Rabi', duration: '110-140 days', yield: '1-1.5 tons/acre' },
          { name: 'Chickpea', score: 88, season: 'Rabi', duration: '100-120 days', yield: '600-800 kg/acre' }
        ]
      };

      const crops = recommendations[formData.soilType as keyof typeof recommendations] || recommendations['Loamy'];
      
      setRecommendation({
        topCrops: crops,
        soilHealth: 'Good',
        confidence: '89%',
        season: 'Current Season: Rabi',
        notes: [
          'Soil NPK levels are optimal for recommended crops',
          'Weather conditions favorable for next 3 months',
          'Consider crop rotation for better soil health'
        ]
      });

      setLoading(false);
      toast.success('Crop recommendations generated!');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-green-600 p-3 rounded-lg">
          <Sprout className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Crop Recommendation</h1>
          <p className="text-gray-600">AI-powered suggestions based on soil and climate data</p>
        </div>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Farm Details</CardTitle>
          <CardDescription>Provide accurate information for better recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="state" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                State *
              </Label>
              <Select value={formData.state} onValueChange={(value) => setFormData({...formData, state: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                placeholder="Enter district"
                value={formData.district}
                onChange={(e) => setFormData({...formData, district: e.target.value})}
              />
            </div>

            {/* Soil Type */}
            <div className="space-y-2">
              <Label htmlFor="soilType" className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                Soil Type *
              </Label>
              <Select value={formData.soilType} onValueChange={(value) => setFormData({...formData, soilType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  {soilTypes.map(soil => (
                    <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* NPK Values */}
            <div className="space-y-2">
              <Label htmlFor="nitrogen">Nitrogen (N) - kg/ha</Label>
              <Input
                id="nitrogen"
                type="number"
                placeholder="e.g., 40"
                value={formData.nitrogen}
                onChange={(e) => setFormData({...formData, nitrogen: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phosphorus">Phosphorus (P) - kg/ha</Label>
              <Input
                id="phosphorus"
                type="number"
                placeholder="e.g., 30"
                value={formData.phosphorus}
                onChange={(e) => setFormData({...formData, phosphorus: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="potassium">Potassium (K) - kg/ha</Label>
              <Input
                id="potassium"
                type="number"
                placeholder="e.g., 20"
                value={formData.potassium}
                onChange={(e) => setFormData({...formData, potassium: e.target.value})}
              />
            </div>

            {/* pH */}
            <div className="space-y-2">
              <Label htmlFor="ph">Soil pH</Label>
              <Input
                id="ph"
                type="number"
                step="0.1"
                placeholder="e.g., 6.5"
                value={formData.ph}
                onChange={(e) => setFormData({...formData, ph: e.target.value})}
              />
            </div>

            {/* Climate */}
            <div className="space-y-2">
              <Label htmlFor="temperature" className="flex items-center gap-2">
                <ThermometerSun className="h-4 w-4" />
                Temperature (°C)
              </Label>
              <Input
                id="temperature"
                type="number"
                placeholder="e.g., 25"
                value={formData.temperature}
                onChange={(e) => setFormData({...formData, temperature: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="humidity">Humidity (%)</Label>
              <Input
                id="humidity"
                type="number"
                placeholder="e.g., 70"
                value={formData.humidity}
                onChange={(e) => setFormData({...formData, humidity: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rainfall">Rainfall (mm)</Label>
              <Input
                id="rainfall"
                type="number"
                placeholder="e.g., 800"
                value={formData.rainfall}
                onChange={(e) => setFormData({...formData, rainfall: e.target.value})}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button 
              className="w-full md:w-auto bg-green-600 hover:bg-green-700" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                'Get Recommendations'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {recommendation && (
        <div className="space-y-4">
          {/* Summary */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Soil Health</p>
                  <p className="text-lg font-bold text-green-700">{recommendation.soilHealth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confidence</p>
                  <p className="text-lg font-bold text-green-700">{recommendation.confidence}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Season</p>
                  <p className="text-lg font-bold text-green-700">{recommendation.season}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Top Crop Recommendations */}
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Top Recommended Crops
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendation.topCrops.map((crop: any, index: number) => (
                <Card key={index} className={`${index === 0 ? 'border-2 border-green-500 shadow-lg' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-xl">{crop.name}</CardTitle>
                      <Badge className="bg-green-600">{crop.score}%</Badge>
                    </div>
                    {index === 0 && (
                      <Badge variant="outline" className="w-fit text-green-700 border-green-700">
                        Best Match
                      </Badge>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Season:</span>
                        <span className="font-semibold">{crop.season}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">{crop.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exp. Yield:</span>
                        <span className="font-semibold text-green-700">{crop.yield}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {recommendation.notes.map((note: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="text-gray-700">{note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
