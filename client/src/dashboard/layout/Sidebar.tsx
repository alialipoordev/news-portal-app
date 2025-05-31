import { useContext, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdDashboard } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { PiUsersFill } from "react-icons/pi";
import { FaHouseUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";

import NavMenu from "../components/NavMenu";
import storeContext from "../../context/storeContext";

const MENU_ITEMS = {
  shared: [
    { to: "/dashboard/news", icon: <BiNews />, label: "News", id: 100 },
    {
      to: "/dashboard/profile",
      icon: <FaHouseUser />,
      label: "Profile",
      id: 101,
    },
  ],
  admin: [
    {
      to: "/dashboard/admin",
      icon: <MdDashboard />,
      label: "Dashboard",
      id: 102,
    },
    {
      to: "/dashboard/writer/add",
      icon: <MdDashboard />,
      label: "Add Writer",
      id: 103,
    },
    {
      to: "/dashboard/writers",
      icon: <PiUsersFill />,
      label: "Writers",
      id: 104,
    },
  ],
  writer: [
    {
      to: "/dashboard/writer",
      icon: <MdDashboard />,
      label: "Dashboard",
      id: 105,
    },
    {
      to: "/dashboard/news/create",
      icon: <IoMdAdd />,
      label: "Add News",
      id: 106,
    },
  ],
  logout: { to: "#", icon: <FiLogOut />, label: "Logout", id: 107 },
};

const Sidebar = () => {
  const { store, dispatch } = useContext(storeContext);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("newsToken");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  }

  const isAdmin = store.userInfo?.role === "admin";

  const menuItems = useMemo(() => {
    const roleBasedMenu = isAdmin ? MENU_ITEMS.admin : MENU_ITEMS.writer;

    return [
      ...roleBasedMenu,
      ...MENU_ITEMS.shared,
      {
        ...MENU_ITEMS.logout,
        onClick: handleLogout,
      },
    ];
  }, [store.userInfo?.role]);

  return (
    <div className="w-[250px] h-screen fixed left-0 top-0 bg-[#dadaff]">
      <div className="h-[70px] flex justify-center items-center">
        <Link to="/">
          <img
            className="w-[190px] h-[35px]"
            src="https://i.ibb.co.com/WcB36Jq/mainlogo.png"
            alt=""
          />
        </Link>
      </div>

      <NavMenu items={menuItems} />
    </div>
  );
};

export default Sidebar;
