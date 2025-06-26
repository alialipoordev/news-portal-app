import Image from "next/image";
import React from "react";
import logo from "../../assets/logo.png";
import FooterGallery from "./FooterGallery";
import FooterCategories from "./FooterCategories";
import FooterRecentNews from "./FooterRecentNews";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#333333] text-[#cccccc]">
      <div className="w-full">
        <div className="bg-[#1e1919]">
          <div className="px-4 md:px-8 py-10 gap-12 w-full grid lg:grid-cols-4 grid-cols-1">
            <div className="w-full">
              <div className="w-full flex flex-col gap-y-[14px]">
                <Image
                  src={logo}
                  alt="logo"
                  style={{ width: "200px", height: "auto" }}
                />
                <h2 className="text-slate-300 text-justify">
                  EasyNews24.com is one of the popular news portals . It was
                  started with a commitment to fearless, investigative,
                  informative and independent journalism.technology.
                </h2>
              </div>
            </div>

            <FooterGallery />

            <div>
              <FooterCategories />
            </div>

            <FooterRecentNews />
          </div>
        </div>
      </div>
      <div>
        <div className="px-4 md:px-8 py-5 flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="flex gap-y-2 text-gray-300 justify-start items-center">
            <span>Copyright @ 2025</span>
          </div>

          <div className="flex gap-x-[4px]">
            <a
              href="#"
              className="w-[37px] h-[35px] text-white flex justify-center items-center bg-slate-600 hover:bg-slate-500"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-[37px] h-[35px] text-white flex justify-center items-center bg-slate-600 hover:bg-slate-500"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="w-[37px] h-[35px] text-white flex justify-center items-center bg-slate-600 hover:bg-slate-500"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
