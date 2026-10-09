import { TriangleDownFill, TriangleUpFill } from "@gravity-ui/icons";

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
  return (
    <div
      key={product?.id}
      className="rounded-xl border border-gray-300 bg-white p-4 sm:p-5 transition-shadow hover:shadow-md"
    >
      {/* Product Information */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-2xl">
          {product?.categoryIcon}
        </div>

        <div className="min-w-0">
          <h3 className="font-bold text-gray-900 text-base sm:text-lg">
            {product?.nameBn}
          </h3>
          <p className="mt-1 text-sm text-gray-500">প্রতি {product?.unit}</p>
        </div>
      </div>

      {/* Price and Change */}
      <div className="mt-5 flex items-end justify-between gap-3 border-t border-gray-100 pt-4">
        <div>
          <p className="mb-1 text-sm text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900">
            {product?.today} টাকা
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold ">
          {product?.change?.dir === "up" ? (
            <>
              <TriangleUpFill className="shrink-0 text-red-500" />
              <span>{Math.abs(Number(product?.change?.pct))}%</span>
            </>
          ) : (
            <>
              <TriangleDownFill className="text-green-500" />
              <span>{Math.abs(Number(product?.change?.pct))}%</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllProductCard;
