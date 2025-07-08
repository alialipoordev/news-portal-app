import BASE_URL from "@/config/config";
import Image from "next/image";
import React from "react";

interface ImagesItem {
  image: string;
}

async function FooterGallery() {
  const res = await fetch(`${BASE_URL}/api/public/gallery`, {
    next: { revalidate: 60 },
  });

  const { images }: { images: ImagesItem[] } = await res.json();

  return (
    <div className="w-full flex flex-col gap-y-[14px]">
      <div className="text-xl font-bold text-white relative before:absolute before:w-[4px] before:bg-[#5271ff] before:h-full before:-left-0 pl-3">
        Gallery
      </div>
      <div className="grid grid-cols-3 gap-2">
        {images?.map((item, i) => (
          <div key={i} className="w-full h-[85px] relative">
            <Image
              fill
              src={item?.image}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="gallery image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FooterGallery;
