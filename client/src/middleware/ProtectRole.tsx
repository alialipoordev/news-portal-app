import { Navigate, Outlet } from "react-router-dom";

interface ProtectRoleProps {
  role: string;
}
function ProtectRole({ role }: ProtectRoleProps) {
  const user = {
    name: "Ali",
    // role: "admin",
    role: "writer",
  };

  if (user.role === role) return <Outlet />;
  else return <Navigate to="/dashboard/access-denied" />;
}

export default ProtectRole;
