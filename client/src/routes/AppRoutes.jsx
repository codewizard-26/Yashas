import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "../shared/layouts/DashboardLayout/DashboardLayout";
import DashboardOverview from "../features/dashboard/pages/DashboardOverview";
import StudentPortfolio from "../features/profile/StudentPortfolio";
import CertificateVault from "../features/certificates/CertificateVault";
import EventPassport from "../features/events/EventPassport";
import JobsBoard from "../features/jobs/JobsBoard";
import MessagingPage from "../features/messaging/MessagingPage";
import NotificationsPage from "../features/notifications/NotificationsPage";
import CommunityPage from "../features/community/CommunityPage";
import InstitutionsPage from "../features/institutions/InstitutionsPage";
import VerificationDesk from "../features/verification/VerificationDesk";

function AppRoutes() {
  return (
    <Routes>
      {/* Root redirect to dashboard overview */}
      <Route path="/" element={<Navigate to="/dashboard/overview" replace />} />

      {/* Main Dashboard Layout and Routes */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard/overview" replace />} />
        <Route path="overview" element={<DashboardOverview />} />
        <Route path="portfolio" element={<StudentPortfolio />} />
        <Route path="certificates" element={<CertificateVault />} />
        <Route path="events" element={<EventPassport />} />
        <Route path="jobs" element={<JobsBoard />} />
        <Route path="messaging" element={<MessagingPage />} />
        <Route path="messages" element={<MessagingPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="institutions" element={<InstitutionsPage />} />
        <Route path="verification" element={<VerificationDesk />} />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/dashboard/overview" replace />} />
    </Routes>
  );
}

export default AppRoutes;