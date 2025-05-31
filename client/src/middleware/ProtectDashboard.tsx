import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import storeContext from "../context/storeContext";

function ProtectDashboard() {
  const { store } = useContext(storeContext);

  if (store.userInfo) return <Outlet />;
  else return <Navigate to="/login" />;
}

export default ProtectDashboard;
