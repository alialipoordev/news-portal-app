import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import storeContext from "../context/storeContext";

interface ProtectRoleProps {
  role: string;
}
function ProtectRole({ role }: ProtectRoleProps) {
  const { store } = useContext(storeContext);

  if (store.userInfo?.role === role) return <Outlet />;
  else return <Navigate to="/dashboard/access-denied" />;
}

export default ProtectRole;
