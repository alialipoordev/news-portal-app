import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { PiUsersFill } from "react-icons/pi";
import { FaHouseUser } from "react-icons/fa";
import NavMenu from "../components/NavMenu";

const menuItems = [
  {
    to: "/dashboard/admin",
    icon: <MdDashboard />,
    label: "Dashboard",
    id: 1,
  },
  {
    to: "/dashboard/news",
    icon: <BiNews />,
    label: "News",
    id: 2,
  },
  {
    to: "/dashboard/writer/add",
    icon: <MdDashboard />,
    label: "Add Writer",
    id: 3,
  },
  {
    to: "/dashboard/writers",
    icon: <PiUsersFill />,
    label: "Writers",
    id: 4,
  },
  {
    to: "/dashboard/profile",
    icon: <FaHouseUser />,
    label: "Profile",
    id: 5,
  },
];

const Sidebar = () => {
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
