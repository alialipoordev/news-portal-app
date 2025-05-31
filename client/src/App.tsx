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
import CreateNewsPage from "./dashboard/pages/CreateNewsPage";
import WriterPage from "./dashboard/pages/WriterPage";
import { useContext } from "react";
import storeContext from "./context/storeContext";

function App() {
  const { store } = useContext(storeContext);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route path="/dashboard" element={<ProtectDashboard />}>
            <Route path="" element={<MainLayout />}>
              <Route
                path=""
                element={
                  store.userInfo?.role === "admin" ? (
                    <Navigate to="/dashboard/admin" />
                  ) : (
                    <Navigate to="/dashboard/writer" />
                  )
                }
              />
              <Route path="access-denied" element={<AccessDeniedPage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="news" element={<NewsPage />} />

              <Route path="" element={<ProtectRole role="admin" />}>
                <Route path="admin" element={<AdminPage />} />
                <Route path="writers" element={<WritersPage />} />
                <Route path="writer/add" element={<AddWriterPage />} />
              </Route>

              <Route path="" element={<ProtectRole role="writer" />}>
                <Route path="writer" element={<WriterPage />} />
                <Route path="news/create" element={<CreateNewsPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
