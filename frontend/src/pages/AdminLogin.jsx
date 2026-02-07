import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, ArrowLeft, Gift } from 'lucide-react';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // PHASE 35: Referral code from URL
  const [referralCode, setReferralCode] = useState('');
  const [referralMessage, setReferralMessage] = useState('');
  
  useEffect(() => {
    // Get referral code from URL params
    const refCode = searchParams.get('ref');
    if (refCode) {
      setReferralCode(refCode.toUpperCase());
      setReferralMessage(`🎁 Using referral code: ${refCode.toUpperCase()} - You'll get 50 free credits!`);
      // Store in sessionStorage for profile creation
      sessionStorage.setItem('referral_code', refCode.toUpperCase());
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success) {
      // PHASE 35: Keep referral code in sessionStorage for profile creation
      if (referralCode) {
        sessionStorage.setItem('referral_code', referralCode);
      }
      navigate('/admin/dashboard');
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="p-8 shadow-xl">
          <div className="text-center mb-8">
            <Heart className="w-12 h-12 mx-auto text-rose-500 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access your invitation dashboard</p>
          </div>

          {/* PHASE 35: Referral Message */}
          {referralMessage && (
            <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <Gift className="w-5 h-5 text-purple-600" />
                <p className="text-sm font-medium text-purple-800">{referralMessage}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="••••••••"
              />
            </div>

            {/* PHASE 35: Referral Code Input (Optional) */}
            {!searchParams.get('ref') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Referral Code (Optional)
                </label>
                <input
                  type="text"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Enter code for 50 free credits"
                  maxLength={12}
                />
                {referralCode && (
                  <p className="mt-1 text-sm text-purple-600 flex items-center gap-1">
                    <Gift className="w-4 h-4" />
                    You'll earn 50 credits on first profile creation!
                  </p>
                )}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Default credentials:</p>
            <p className="font-mono text-xs mt-1">admin@wedding.com / admin123</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
