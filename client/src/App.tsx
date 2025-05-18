import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./dashboard/pages/LoginPage";
import MainLayout from "./dashboard/layout/MainLayout";
import AdminPage from "./dashboard/pages/AdminPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<MainLayout />}>
            <Route path="" element={<Navigate to="/dashboard/admin" />}>
              <Route path="admin" element={<AdminPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
