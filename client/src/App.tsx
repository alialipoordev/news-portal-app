import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectDashboard from "./middleware/ProtectDashboard";
import ProtectRole from "./middleware/ProtectRole";
import MainLayout from "./dashboard/layout/MainLayout";
import LoginPage from "./dashboard/pages/LoginPage";
import AdminPage from "./dashboard/pages/AdminPage";
import AccessDeniedPage from "./dashboard/pages/AccessDeniedPage";
import ProfilePage from "./dashboard/pages/ProfilePage";
import NewsPage from "./dashboard/pages/NewsPage";
import WritersPage from "./dashboard/pages/WritersPage";
import AddWriterPage from "./dashboard/pages/AddWriterPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<ProtectDashboard />}>
            <Route path="" element={<MainLayout />}>
              <Route path="" element={<Navigate to="/dashboard/admin" />} />
              <Route path="access-denied" element={<AccessDeniedPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="news" element={<NewsPage />} />

              <Route path="" element={<ProtectRole role="admin" />}>
                <Route path="admin" element={<AdminPage />} />
                <Route path="writers" element={<WritersPage />} />
                <Route path="writer/add" element={<AddWriterPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
