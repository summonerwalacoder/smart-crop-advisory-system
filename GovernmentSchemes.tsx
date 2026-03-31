import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { FileText, ExternalLink, CheckCircle, Info } from 'lucide-react';

export default function GovernmentSchemes() {
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const schemes = [
    {
      name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
      category: 'Financial Assistance',
      state: 'All India',
      description: 'Direct income support of ₹6,000 per year to all landholding farmers',
      benefits: ['₹2,000 per installment', '3 installments per year', 'Direct bank transfer'],
      eligibility: ['All landholding farmers', 'Valid Aadhaar card', 'Bank account linked'],
      status: 'Active',
      link: 'https://pmkisan.gov.in'
    },
    {
      name: 'Kisan Credit Card (KCC)',
      category: 'Credit & Loans',
      state: 'All India',
      description: 'Easy credit facility for farmers at subsidized interest rates',
      benefits: ['Interest rate: 4% per annum', 'Up to ₹3 lakh credit limit', 'Flexible repayment'],
      eligibility: ['Farmers with land ownership', 'Valid identity proof', 'Good credit history'],
      status: 'Active',
      link: 'https://www.nabard.org'
    },
    {
      name: 'Soil Health Card Scheme',
      category: 'Soil & Testing',
      state: 'All India',
      description: 'Free soil testing and personalized recommendations for nutrient management',
      benefits: ['Free soil testing', 'Customized fertilizer recommendations', 'Improve soil health'],
      eligibility: ['All farmers', 'Register at local agriculture office'],
      status: 'Active',
      link: 'https://soilhealth.dac.gov.in'
    },
    {
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'Insurance',
      state: 'All India',
      description: 'Comprehensive crop insurance scheme against natural calamities',
      benefits: ['Subsidized premium', 'Coverage for all risks', 'Quick claim settlement'],
      eligibility: ['All farmers (loanee and non-loanee)', 'Registered crop details'],
      status: 'Active',
      link: 'https://pmfby.gov.in'
    },
    {
      name: 'National Mission for Sustainable Agriculture',
      category: 'Sustainable Farming',
      state: 'All India',
      description: 'Promotes sustainable agriculture practices and climate resilience',
      benefits: ['Subsidy on organic farming', 'Training on sustainable practices', 'Financial support'],
      eligibility: ['Farmers adopting sustainable practices', 'Organic certification (optional)'],
      status: 'Active',
      link: 'https://agricoop.gov.in'
    },
    {
      name: 'Pradhan Mantri Krishi Sinchai Yojana',
      category: 'Irrigation',
      state: 'All India',
      description: 'Expand cultivated area with assured irrigation and improve water efficiency',
      benefits: ['Subsidy on drip/sprinkler systems', 'Micro-irrigation support', 'Water conservation'],
      eligibility: ['Small and marginal farmers', 'Priority to women farmers'],
      status: 'Active',
      link: 'https://pmksy.gov.in'
    },
    {
      name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      category: 'Organic Farming',
      state: 'All India',
      description: 'Promotes organic farming and organic clusters',
      benefits: ['₹50,000 per hectare over 3 years', 'Organic certification support', 'Market linkage'],
      eligibility: ['Farmers willing to adopt organic farming', 'Form clusters of 20 or more'],
      status: 'Active',
      link: 'https://pgsindia-ncof.gov.in'
    },
    {
      name: 'Karnataka Raitha Suraksha Pradhan Mantri Fasal Bima Yojana',
      category: 'Insurance',
      state: 'Karnataka',
      description: 'State-specific enhanced crop insurance with additional coverage',
      benefits: ['Additional 25% state subsidy', 'Faster claim processing', 'Mobile-based enrollment'],
      eligibility: ['Karnataka farmers', 'Crop enrollment during sowing'],
      status: 'Active',
      link: 'https://raitamitra.karnataka.gov.in'
    },
  ];

  const categories = ['All', 'Financial Assistance', 'Credit & Loans', 'Insurance', 'Irrigation', 'Organic Farming', 'Sustainable Farming', 'Soil & Testing'];
  const states = ['All', 'All India', 'Karnataka', 'Maharashtra', 'Punjab', 'Tamil Nadu'];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesState = selectedState === 'All' || scheme.state === selectedState;
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory;
    return matchesState && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-3 rounded-lg">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Government Schemes</h1>
          <p className="text-gray-600">Financial assistance and subsidy programs for farmers</p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filter by State</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {states.map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filter by Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Showing <strong>{filteredSchemes.length}</strong> scheme{filteredSchemes.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Schemes List */}
      <div className="space-y-4">
        {filteredSchemes.map((scheme, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                <div className="flex-1">
                  <CardTitle className="text-xl mb-2">{scheme.name}</CardTitle>
                  <CardDescription className="text-gray-700">
                    {scheme.description}
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-2 md:items-end">
                  <Badge className="w-fit bg-green-600">{scheme.status}</Badge>
                  <Badge variant="outline" className="w-fit">{scheme.category}</Badge>
                  <Badge variant="secondary" className="w-fit">{scheme.state}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Benefits */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Key Benefits
                </h4>
                <ul className="space-y-1 ml-6">
                  {scheme.benefits.map((benefit, i) => (
                    <li key={i} className="text-sm text-gray-700 list-disc">{benefit}</li>
                  ))}
                </ul>
              </div>

              {/* Eligibility */}
              <div>
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-600" />
                  Eligibility Criteria
                </h4>
                <ul className="space-y-1 ml-6">
                  {scheme.eligibility.map((criteria, i) => (
                    <li key={i} className="text-sm text-gray-700 list-disc">{criteria}</li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t">
                <Button 
                  className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => window.open(scheme.link, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Official Website
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <h3 className="font-bold text-xl text-gray-800 mb-3">Need Help Applying?</h3>
          <p className="text-gray-700 mb-4">
            Visit your nearest Krishi Vigyan Kendra (KVK) or Agriculture Office for assistance with scheme applications and documentation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">Find Nearest KVK</Button>
            <Button variant="outline">Download Application Forms</Button>
            <Button variant="outline">Contact Helpline</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
