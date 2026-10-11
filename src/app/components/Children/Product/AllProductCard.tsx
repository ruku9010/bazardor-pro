
import {
  TriangleDownFill,
  TriangleUpFill,
} from "@gravity-ui/icons";
import {
  formatChange,
  formatPrice,
  formatUnit,
} from "../../../utils/priceFormatter";

interface Product {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: string;
    pct: number;
  };
}

const AllProductCard = ({ product }: { product: Product }) => {
  const direction = product.change?.dir?.toLowerCase();
  const isUp = direction === "up";
  const isDown = direction === "down";
  const isFlat = !isUp && !isDown;

  return (
    <div className="rounded-xl border border-gray-300 bg-white p-4 transition-shadow hover:shadow-md sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl">
          {product.categoryIcon}
        </div>

        <div className="min-w-0">
          <h3 className="text-base font-bold text-gray-900 sm:text-lg">
            {product.nameBn}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {formatUnit(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
        <div className="min-w-0">
          <p className="mb-1 text-sm text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900">
            {formatPrice(product.today)}
          </p>
        </div>

        <div
          className={`flex shrink-0 items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold ${
            isUp
              ? "bg-green-50 text-green-600"
              : isDown
                ? "bg-red-50 text-red-600"
                : "bg-gray-100 text-gray-500"
          }`}
        >
          {isUp ? (
            <TriangleUpFill className="shrink-0" />
          ) : isDown ? (
            <TriangleDownFill className="shrink-0" />
          ) : (
            <span>—</span>
          )}

          <span>
            {formatChange(product.change?.pct ?? 0)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AllProductCard;
