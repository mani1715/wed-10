import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProfileForm from './pages/ProfileForm';
import PublicInvitation from './pages/PublicInvitation';
import RSVPManagement from './pages/RSVPManagement';
// import AnalyticsPage from './pages/AnalyticsPage'; // PHASE 7 - Old Analytics (kept as backup)
import Phase30AnalyticsPage from './pages/Phase30AnalyticsPage'; // PHASE 30 - New Analytics Dashboard
import GreetingsManagement from './pages/GreetingsManagement';
import WishesManagement from './pages/WishesManagement';
import PostWeddingManagement from './pages/PostWeddingManagement';
import QRCodeManagement from './pages/QRCodeManagement';
import AuditLogsPage from './pages/AuditLogsPage';
import ReferralsCreditsPage from './pages/ReferralsCreditsPage'; // PHASE 35
import ThemeSettingsPage from './pages/ThemeSettingsPage'; // PHASE 34
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <AuthProvider>
          <div className="App">
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/profile/new" element={<ProfileForm />} />
                <Route path="/admin/profile/:profileId/edit" element={<ProfileForm />} />
                <Route path="/admin/profile/:profileId/rsvps" element={<RSVPManagement />} />
                <Route path="/admin/profile/:profileId/analytics" element={<Phase30AnalyticsPage />} />
                <Route path="/admin/profile/:profileId/greetings" element={<GreetingsManagement />} />
                <Route path="/admin/profile/:profileId/wishes" element={<WishesManagement />} />
                <Route path="/admin/profile/:profileId/post-wedding" element={<PostWeddingManagement />} />
                <Route path="/admin/profile/:profileId/qr-codes" element={<QRCodeManagement />} />
                <Route path="/admin/profile/:profileId/referrals" element={<ReferralsCreditsPage />} />
                <Route path="/admin/profile/:profileId/theme-settings" element={<ThemeSettingsPage />} />
                <Route path="/admin/audit-logs" element={<AuditLogsPage />} />
                <Route path="/invite/:slug/:eventType" element={<PublicInvitation />} />
                <Route path="/invite/:slug" element={<PublicInvitation />} />
              </Routes>
            </BrowserRouter>
          </div>
        </AuthProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
