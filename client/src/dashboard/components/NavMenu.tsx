import { Link, useLocation } from "react-router-dom";
import { ReactElement } from "react";

interface NavMenuItem {
  to: string;
  icon: ReactElement;
  label: string;
  id: number;
}

interface NavMenuProps {
  items: NavMenuItem[];
}

const activeClassName = "bg-indigo-500 text-white",
  inactiveClassName = "bg-white text-[#404040f6]",
  ulClassName = "px-3 flex flex-col gap-y-1 font-medium",
  linkClassName =
    "px-3 py-2 hover:shadow-lg hover:shadow-indigo-500/20 w-full rounded-lg flex gap-x-2 justify-start items-center hover:bg-indigo-500 hover:text-white";

const NavMenu = ({ items }: NavMenuProps) => {
  const { pathname } = useLocation();

  return (
    <ul className={ulClassName}>
      {items.map((item) => (
        <li key={item.id}>
          <Link
            to={item.to}
            className={`${
              pathname === item.to ? activeClassName : inactiveClassName
            } ${linkClassName}`}
          >
            <span className="text-[18px]">{item.icon}</span>
            <span className="text-[18px]">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
