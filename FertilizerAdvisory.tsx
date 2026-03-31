import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Droplets, Loader2, Calendar, Weight, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function FertilizerAdvisory() {
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    crop: '',
    soilType: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    farmSize: '',
    growthStage: ''
  });

  const crops = [
    'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Maize', 'Tomato', 
    'Potato', 'Onion', 'Groundnut', 'Soybean', 'Chickpea'
  ];

  const soilTypes = ['Sandy', 'Loamy', 'Clay', 'Silt', 'Black', 'Red', 'Alluvial'];
  
  const growthStages = [
    'Seedling', 'Vegetative', 'Flowering', 'Fruiting', 'Maturity'
  ];

  const handleSubmit = () => {
    if (!formData.crop || !formData.soilType || !formData.growthStage) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const n = parseInt(formData.nitrogen) || 30;
      const p = parseInt(formData.phosphorus) || 20;
      const k = parseInt(formData.potassium) || 15;

      const nDeficit = Math.max(0, 50 - n);
      const pDeficit = Math.max(0, 30 - p);
      const kDeficit = Math.max(0, 25 - k);

      setRecommendation({
        primaryFertilizer: {
          name: 'NPK 10:26:26',
          quantity: '50 kg per acre',
          timing: 'Apply within next 7 days',
          method: 'Broadcasting with incorporation'
        },
        secondaryFertilizers: [
          {
            name: 'Urea',
            quantity: `${nDeficit} kg per acre`,
            timing: 'Split application - 50% now, 50% after 20 days',
            purpose: 'Nitrogen supplementation'
          },
          {
            name: 'Single Super Phosphate',
            quantity: `${pDeficit} kg per acre`,
            timing: 'Basal application before sowing',
            purpose: 'Phosphorus boost'
          }
        ],
        micronutrients: [
          { name: 'Zinc Sulphate', quantity: '5 kg/acre', timing: 'Soil application' },
          { name: 'Boron', quantity: '2 kg/acre', timing: 'Foliar spray' }
        ],
        organic: [
          { name: 'Compost', quantity: '2-3 tons/acre', timing: 'Before planting' },
          { name: 'Neem Cake', quantity: '100 kg/acre', timing: 'At the time of sowing' }
        ],
        schedule: [
          { week: 'Week 1', activity: 'Apply NPK fertilizer and compost', status: 'pending' },
          { week: 'Week 2-3', activity: 'First split of Urea', status: 'pending' },
          { week: 'Week 4-5', activity: 'Micronutrient spray', status: 'pending' },
          { week: 'Week 6', activity: 'Second split of Urea', status: 'pending' }
        ],
        soilHealth: {
          nitrogen: Math.min(100, (n / 50) * 100),
          phosphorus: Math.min(100, (p / 30) * 100),
          potassium: Math.min(100, (k / 25) * 100)
        },
        estimatedCost: '₹3,500 - ₹4,500 per acre',
        tips: [
          'Apply fertilizers during cool hours (early morning or evening)',
          'Ensure adequate soil moisture before fertilizer application',
          'Follow soil test recommendations for best results',
          'Combine with organic manures for sustainable farming'
        ]
      });

      setLoading(false);
      toast.success('Fertilizer recommendations generated!');
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-blue-600 p-3 rounded-lg">
          <Droplets className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Fertilizer Advisory</h1>
          <p className="text-gray-600">Optimize fertilizer usage for better yield and cost efficiency</p>
        </div>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle>Enter Crop & Soil Details</CardTitle>
          <CardDescription>Provide accurate information for customized fertilizer recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="crop">Crop *</Label>
              <Select value={formData.crop} onValueChange={(value) => setFormData({...formData, crop: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  {crops.map(crop => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type *</Label>
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

            <div className="space-y-2">
              <Label htmlFor="growthStage">Growth Stage *</Label>
              <Select value={formData.growthStage} onValueChange={(value) => setFormData({...formData, growthStage: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {growthStages.map(stage => (
                    <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nitrogen">Current Nitrogen (kg/ha)</Label>
              <Input
                id="nitrogen"
                type="number"
                placeholder="e.g., 30"
                value={formData.nitrogen}
                onChange={(e) => setFormData({...formData, nitrogen: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phosphorus">Current Phosphorus (kg/ha)</Label>
              <Input
                id="phosphorus"
                type="number"
                placeholder="e.g., 20"
                value={formData.phosphorus}
                onChange={(e) => setFormData({...formData, phosphorus: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="potassium">Current Potassium (kg/ha)</Label>
              <Input
                id="potassium"
                type="number"
                placeholder="e.g., 15"
                value={formData.potassium}
                onChange={(e) => setFormData({...formData, potassium: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="farmSize">Farm Size (acres)</Label>
              <Input
                id="farmSize"
                type="number"
                placeholder="e.g., 5"
                value={formData.farmSize}
                onChange={(e) => setFormData({...formData, farmSize: e.target.value})}
              />
            </div>
          </div>

          <div className="mt-6">
            <Button 
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Calculating...
                </>
              ) : (
                'Get Fertilizer Plan'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {recommendation && (
        <div className="space-y-4">
          {/* Soil Health Status */}
          <Card>
            <CardHeader>
              <CardTitle>Current Soil Nutrient Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Nitrogen (N)</span>
                  <span className="text-sm font-bold">{recommendation.soilHealth.nitrogen.toFixed(0)}%</span>
                </div>
                <Progress value={recommendation.soilHealth.nitrogen} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Phosphorus (P)</span>
                  <span className="text-sm font-bold">{recommendation.soilHealth.phosphorus.toFixed(0)}%</span>
                </div>
                <Progress value={recommendation.soilHealth.phosphorus} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Potassium (K)</span>
                  <span className="text-sm font-bold">{recommendation.soilHealth.potassium.toFixed(0)}%</span>
                </div>
                <Progress value={recommendation.soilHealth.potassium} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Primary Fertilizer */}
          <Card className="border-2 border-blue-500 bg-blue-50">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <Badge className="mb-2 bg-blue-600">Recommended</Badge>
                  <CardTitle className="text-2xl">{recommendation.primaryFertilizer.name}</CardTitle>
                  <CardDescription className="mt-2 text-gray-700">
                    Primary fertilizer for {formData.crop} at {formData.growthStage} stage
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Weight className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Quantity:</span>
                <span>{recommendation.primaryFertilizer.quantity}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Timing:</span>
                <span>{recommendation.primaryFertilizer.timing}</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span className="font-semibold">Method:</span>
                <span>{recommendation.primaryFertilizer.method}</span>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Fertilizers */}
          <div>
            <h3 className="text-xl font-bold mb-3">Secondary Fertilizers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendation.secondaryFertilizers.map((fert: any, index: number) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{fert.name}</CardTitle>
                    <CardDescription>{fert.purpose}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <p><span className="font-semibold">Quantity:</span> {fert.quantity}</p>
                    <p><span className="font-semibold">Timing:</span> {fert.timing}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Application Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendation.schedule.map((item: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50 rounded">
                    <div className="font-bold text-green-700 min-w-[80px]">{item.week}</div>
                    <div className="flex-1">{item.activity}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Micronutrients & Organic */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Micronutrients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendation.micronutrients.map((micro: any, index: number) => (
                    <li key={index} className="text-sm">
                      <span className="font-semibold">{micro.name}:</span> {micro.quantity} ({micro.timing})
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Organic Options</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {recommendation.organic.map((org: any, index: number) => (
                    <li key={index} className="text-sm">
                      <span className="font-semibold">{org.name}:</span> {org.quantity} ({org.timing})
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Cost & Tips */}
          <Card className="bg-gradient-to-r from-amber-50 to-orange-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Estimated Cost</h3>
                <p className="text-2xl font-bold text-orange-700">{recommendation.estimatedCost}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">💡 Pro Tips:</h4>
                <ul className="space-y-1 text-sm text-gray-700">
                  {recommendation.tips.map((tip: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
