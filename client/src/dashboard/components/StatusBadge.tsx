import { FC } from "react";

interface StatusBadgeProps {
  status: "active" | "pending" | "inactive";
  onClick?: () => void;
  role: "admin" | "writer";
}

const StatusBadge: FC<StatusBadgeProps> = ({ status, onClick, role }) => {
  const getStatusClasses = () => {
    const baseClasses = {
      active: "bg-green-200 text-green-800",
      pending: "bg-blue-200 text-blue-800",
      inactive: "bg-red-200 text-red-700",
    };

    const hoverClasses = {
      active: "hover:bg-green-300",
      pending: "hover:bg-blue-300",
      inactive: "hover:bg-red-300",
    };

    return role === "admin" && onClick
      ? `${baseClasses[status]} ${hoverClasses[status]}`
      : baseClasses[status];
  };

  return (
    <span
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        role === "admin" && onClick ? "cursor-pointer" : ""
      } ${getStatusClasses()}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
