import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { NewListingPage } from './pages/NewListingPage';
import { ListingResultsPage } from './pages/ListingResultsPage';
import { SettingsPage } from './pages/SettingsPage';
import { PublicMiniSitePage } from './pages/PublicMiniSitePage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/new" element={<NewListingPage />} />
        <Route path="/dashboard/listing/:id" element={<ListingResultsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />

        <Route path="/p/:slug" element={<PublicMiniSitePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
