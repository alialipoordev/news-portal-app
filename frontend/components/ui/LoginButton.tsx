"use client";

import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";

export interface LoginButtonProps {
  className?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({ className }) => {
  const router = useRouter();

  return (
    <div className={"flex items-center gap-1.5"}>
      <button
        type="button"
        onClick={() => router.push("/client/login")}
        className={cn(
          "px-3 py-1 text-[11.5px] font-semibold text-surface bg-text-secondary hover:bg-secondary rounded-md transition-colors duration-150",
          className,
        )}
      >
        Log in
      </button>
    </div>
  );
};
