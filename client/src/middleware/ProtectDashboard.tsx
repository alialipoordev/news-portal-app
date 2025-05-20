import { Navigate, Outlet } from "react-router-dom";

function ProtectDashboard() {
  const user = {
    name: "Ali",
    role: "admin",
  };

  if (user) return <Outlet />;
  else return <Navigate to="/login" />;
}

export default ProtectDashboard;
