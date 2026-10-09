import { TriangleDownFill, TriangleUpFill } from "@gravity-ui/icons";
import React from "react";
import MarqueeText from "react-marquee-text";

export interface MarqueeProps {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: Change;
  markets: Market[];
}

export interface Change {
  dir: string;
  pct: number;
}

export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

const Marquee = async () => {
  let data: MarqueeProps[] = [];

  try {
    const response = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    data = await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
  }

  return (
    <div className="bg-white text-black">
      <div className="flex ">
        <MarqueeText className="py-1" direction="right" duration={10} pauseOnHover={true}>
          <div className="flex gap-10 items-center">
            {data.map((d) => (
              <li key={d.id} className="list-none">
                <div className="flex gap-2 items-center">
                  <span>{d.categoryIcon}</span>
                  <span>{d.nameBn}</span>
                  <span>{d.today}</span>
                  <span>
                    {
                        d.change.dir === "up" ? 
                        <><TriangleUpFill className="text-green-500" /></> 
                        : 
                        <><TriangleDownFill className="text-red-500" /></>
                    }
                  </span>
                  <span>{Math.abs(Number(d.change.pct))}%</span>
                </div>
              </li>
            ))}
          </div>
        </MarqueeText>
      </div>
    </div>
  );
};

export default Marquee;
