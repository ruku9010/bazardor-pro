
import {
  TriangleDownFill,
  TriangleUpFill,
} from "@gravity-ui/icons";
import MarqueeText from "react-marquee-text";
import {
  formatChange,
  formatPrice,
  formatUnit,
} from "../utils/priceFormatter";

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
    <div className="overflow-hidden bg-white text-black">
      <MarqueeText
        className="py-2"
        direction="right"
        duration={10}
        pauseOnHover={true}
      >
        <ul className="flex items-center gap-8">
          {data.map((d) => {
            const direction = d.change?.dir?.toLowerCase();
            const isUp = direction === "up";
            const isDown = direction === "down";
            const isFlat = !isUp && !isDown;

            return (
              <li key={d.id} className="shrink-0 list-none">
                <div className="flex items-center gap-2 whitespace-nowrap text-sm">
                  <span>{d.categoryIcon}</span>

                  <span className="font-medium">{d.nameBn}</span>

                  <span className="text-gray-500">
                    {formatUnit(d.unit)}
                  </span>

                  <span className="font-bold">
                    {formatPrice(d.today)}
                  </span>

                  <span
                    className={`flex items-center gap-1 font-semibold ${
                      isUp
                        ? "text-green-600"
                        : isDown
                          ? "text-red-500"
                          : "text-gray-500"
                    }`}
                  >
                    {isUp ? (
                      <TriangleUpFill className="shrink-0" />
                    ) : isDown ? (
                      <TriangleDownFill className="shrink-0" />
                    ) : (
                      <span>—</span>
                    )}

                    {formatChange(d.change?.pct ?? 0)}%
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
