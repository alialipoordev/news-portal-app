import React from "react";
import Image from "next/image";

import logo from "../../assets/logo.png";
import bg_header from "../../assets/header-bg.jpg";
import HeaderCategory from "./HeaderCategory";
import BASE_URL from "@/config/config";
import { SocialLinks } from "../features/social/SocialLinks";
import { Divider } from "../ui/Divider";
import { LoginButton } from "../ui/LoginButton";
import { SocialLink } from "@/types/type";
import { LiveBadge } from "./LiveBadge";

const socialLinks = [
  { platform: "x", href: "", label: "" },
  { platform: "instagram", href: "", label: "" },
  { platform: "youtube", href: "", label: "" },
  { platform: "linkedin", href: "", label: "" },
  { platform: "facebook", href: "", label: "" },
] as SocialLink[];

async function Header() {
  const res = await fetch(`${BASE_URL}/api/public/categories/all`, {
    next: { revalidate: 60 }, // ISR: revalidate every 60s
  });
  const { categories } = await res.json();

  return (
    <header className="bg-primary text-white/70">
      <div className="px-5 lg:px-8 flex justify-between items-center py-2 border-b border-[#444444]">
        <LiveBadge />

        <div className="flex space-x-2">
          <SocialLinks links={socialLinks} className="hidden sm:inline-flex" />

          <Divider
            orientation="vertical"
            className="bg-white/15 hidden lg:inline-flex"
          />

          <LoginButton className="hidden lg:inline-flex hover:text-accent cursor-pointer w-22 justify-center" />
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${bg_header.src})` }}
        className="bg-cover bg-center text-center py-6"
      >
        <div className="px-5 lg:px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="md:w-4/12 w-full flex flex-col items-center md:items-start space-y-3">
            <Image
              className="w-[200px] h-full"
              alt="logo"
              src={logo}
              // priority
            />
            <h2 className="text-[#cccccc] text-md md:text-md font-semibold tracking-wide text-center md:text-left">
              Media That Rocks Your World
            </h2>
          </div>
        </div>
      </div>

      <HeaderCategory categories={categories} />
    </header>
  );
}

export default Header;
