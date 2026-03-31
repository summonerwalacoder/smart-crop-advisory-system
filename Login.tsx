import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { InputOTP, InputOTPGroup, InputOTPSlot } from './ui/input-otp';
import { Sprout, Phone, Shield } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Demo credentials
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handleSendOTP = async () => {
    if (phoneNumber.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      toast.success('OTP sent successfully! Use 123456 for demo');
    }, 1000);
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setIsLoading(true);
    // Demo OTP verification
    setTimeout(() => {
      if (otp === '123456') {
        const userData = {
          id: '1',
          name: 'Farmer Kumar',
          phone: phoneNumber,
          role: 'farmer',
          location: 'Karnataka, India'
        };
        localStorage.setItem('user', JSON.stringify(userData));
        toast.success('Login successful!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid OTP. Use 123456 for demo');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleAdminLogin = () => {
    if (adminEmail === 'admin@smartcrop.com' && adminPassword === 'admin123') {
      const adminData = {
        id: 'admin1',
        name: 'Admin User',
        email: adminEmail,
        role: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(adminData));
      toast.success('Admin login successful!');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials. Use admin@smartcrop.com / admin123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-green-600 p-4 rounded-full">
              <Sprout className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-700 mb-2">SmartCrop</h1>
          <p className="text-gray-600">AI-Powered Crop Advisory System</p>
          <p className="text-sm text-gray-500 mt-1">For Small & Marginal Farmers</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Login to access your farm advisory</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="farmer" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="farmer">
                  <Phone className="h-4 w-4 mr-2" />
                  Farmer
                </TabsTrigger>
                <TabsTrigger value="admin">
                  <Shield className="h-4 w-4 mr-2" />
                  Admin
                </TabsTrigger>
              </TabsList>

              {/* Farmer Login */}
              <TabsContent value="farmer" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    disabled={otpSent}
                  />
                </div>

                {!otpSent ? (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700" 
                    onClick={handleSendOTP}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send OTP'}
                  </Button>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <div className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={otp}
                          onChange={(value) => setOtp(value)}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                      <p className="text-xs text-center text-gray-500">
                        Demo OTP: 123456
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setOtpSent(false);
                          setOtp('');
                        }}
                      >
                        Change Number
                      </Button>
                      <Button 
                        className="flex-1 bg-green-600 hover:bg-green-700" 
                        onClick={handleVerifyOTP}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Verifying...' : 'Verify & Login'}
                      </Button>
                    </div>
                  </>
                )}
              </TabsContent>

              {/* Admin Login */}
              <TabsContent value="admin" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@smartcrop.com"
                    value={adminEmail}
                    onChange={(e) => setAdminEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Demo: admin@smartcrop.com / admin123
                </p>
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleAdminLogin}
                >
                  Login as Admin
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Features */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p className="mb-2">🌾 Crop Recommendations • 🔬 Disease Detection</p>
          <p>☁️ Weather Alerts • 💰 Market Prices • 🌐 Multi-language</p>
        </div>
      </div>
    </div>
  );
}
