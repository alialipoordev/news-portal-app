import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { PiUsersFill } from "react-icons/pi";
import { FaHouseUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import NavMenu from "../components/NavMenu";

const sharedMenuItems = [
  {
    to: "/dashboard/news",
    icon: <BiNews />,
    label: "News",
    id: 100,
  },
  {
    to: "/dashboard/profile",
    icon: <FaHouseUser />,
    label: "Profile",
    id: 101,
  },
];

const adminMenuItems = [
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
];

const writerMenuItems = [
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
];

const Sidebar = () => {
  const userInfo = {
    // role: "admin",
    role: "writer",
  };

  const isAdmin = userInfo?.role === "admin";
  const roleBasedMenu = isAdmin ? adminMenuItems : writerMenuItems;
  const menuItems = [...roleBasedMenu, ...sharedMenuItems];

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
