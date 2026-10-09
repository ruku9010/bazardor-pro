
"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
      }),
    );
  }, []);

  return (
    <div className="bg-white w-[95%] max-w-7xl mx-auto mt-5 mb-10 p-5 sm:p-8 lg:p-10 rounded-4xl flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-10">
      {/* Left Content */}
      <div className="flex flex-col items-start gap-5 flex-1">
        <span className="bg-[#E1E8E1] rounded-full text-[#05893E] text-sm sm:text-base font-bold px-4 py-2">
          {date || "Loading..."}
        </span>

        <div className="flex flex-col items-start gap-4">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-gray-900">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-7 max-w-xl">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
            বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং
            দামের পরিবর্তন এক জায়গায়।
          </p>

          <Button className="bg-[#05893E] text-white font-medium px-6 py-2 rounded-xl mt-1 transition-transform hover:scale-[1.02]">
            সব পণ্য দেখুন
          </Button>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full md:w-[45%] flex justify-center items-center">
        <Image
          src="/bazar-hero.png"
          alt="bazardor-pro hero"
          width={400}
          height={400}
          priority
          className="w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
