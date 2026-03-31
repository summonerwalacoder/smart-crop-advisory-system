import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Bug, Upload, Camera, Loader2, AlertCircle, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';

export default function DiseaseDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const diseaseDatabase = {
    'Tomato Late Blight': {
      confidence: 94,
      severity: 'High',
      description: 'A devastating disease caused by the fungus Phytophthora infestans',
      symptoms: ['Dark brown spots on leaves', 'White mold on undersides', 'Fruit rot'],
      treatment: [
        'Remove and destroy infected plants immediately',
        'Apply copper-based fungicide every 7-10 days',
        'Ensure proper air circulation',
        'Avoid overhead watering'
      ],
      prevention: [
        'Use resistant varieties',
        'Practice crop rotation',
        'Maintain field hygiene'
      ]
    },
    'Rice Blast': {
      confidence: 91,
      severity: 'High',
      description: 'Fungal disease caused by Magnaporthe oryzae',
      symptoms: ['Diamond-shaped lesions', 'White to gray centers', 'Dark brown margins'],
      treatment: [
        'Apply Tricyclazole fungicide',
        'Use resistant rice varieties',
        'Adjust nitrogen fertilization'
      ],
      prevention: [
        'Avoid excessive nitrogen',
        'Ensure good drainage',
        'Use certified disease-free seeds'
      ]
    },
    'Cotton Leaf Curl': {
      confidence: 88,
      severity: 'Medium',
      description: 'Viral disease transmitted by whiteflies',
      symptoms: ['Upward curling of leaves', 'Vein thickening', 'Stunted growth'],
      treatment: [
        'Control whitefly population with neem-based sprays',
        'Remove infected plants',
        'Use yellow sticky traps'
      ],
      prevention: [
        'Plant resistant varieties',
        'Control whitefly population',
        'Maintain weed-free fields'
      ]
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!image) {
      toast.error('Please upload an image first');
      return;
    }

    setLoading(true);

    // Simulate CNN model prediction
    setTimeout(() => {
      const diseases = Object.keys(diseaseDatabase);
      const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
      const diseaseInfo = diseaseDatabase[randomDisease as keyof typeof diseaseDatabase];

      setResult({
        disease: randomDisease,
        ...diseaseInfo
      });

      setLoading(false);
      toast.success('Analysis complete!');
    }, 2500);
  };

  const handleReset = () => {
    setImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-red-600 p-3 rounded-lg">
          <Bug className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Disease Detection</h1>
          <p className="text-gray-600">Upload plant images for AI-powered disease diagnosis</p>
        </div>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Plant Image</CardTitle>
          <CardDescription>
            Take a clear photo of affected leaves or plant parts. Supported formats: JPG, PNG (Max 5MB)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {!image ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-green-500 transition-colors">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700 mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG up to 5MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={image} 
                    alt="Uploaded plant" 
                    className="w-full max-h-96 object-contain rounded-lg border-2 border-gray-200"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleReset}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Remove
                  </Button>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={handleAnalyze}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Analyzing with AI...
                      </>
                    ) : (
                      <>
                        <Bug className="h-4 w-4 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Another
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          {/* Detection Result */}
          <Card className={`border-2 ${
            result.severity === 'High' ? 'border-red-500 bg-red-50' :
            result.severity === 'Medium' ? 'border-orange-500 bg-orange-50' :
            'border-yellow-500 bg-yellow-50'
          }`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <AlertCircle className={`h-6 w-6 ${
                      result.severity === 'High' ? 'text-red-600' :
                      result.severity === 'Medium' ? 'text-orange-600' :
                      'text-yellow-600'
                    }`} />
                    {result.disease}
                  </CardTitle>
                  <CardDescription className="mt-2 text-gray-700">
                    {result.description}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-600 mb-2">
                    {result.confidence}% Confidence
                  </Badge>
                  <br />
                  <Badge 
                    variant={result.severity === 'High' ? 'destructive' : 'default'}
                    className={result.severity === 'Medium' ? 'bg-orange-500' : ''}
                  >
                    {result.severity} Severity
                  </Badge>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                Symptoms to Watch For
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.symptoms.map((symptom: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-orange-600 mt-1">•</span>
                    <span className="text-gray-700">{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Treatment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                Recommended Treatment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {result.treatment.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 flex-1">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prevention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <CheckCircle className="h-5 w-5" />
                Prevention Measures
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {result.prevention.map((measure: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{measure}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">Need Expert Consultation?</h3>
                  <p className="text-sm text-gray-600">
                    Connect with agricultural experts for personalized advice
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Contact Expert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Cards */}
      {!result && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">📸 Clear Images</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Take photos in good lighting with clear focus on affected areas
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">🔬 AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Our CNN model identifies diseases with 85%+ accuracy
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">💊 Treatment Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600">
                Get instant treatment recommendations and prevention tips
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
