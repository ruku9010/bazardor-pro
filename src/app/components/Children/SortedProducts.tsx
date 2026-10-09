
"use client";

import { Suspense, useState } from "react";
import AllProductCard from "./Product/AllProductCard";
import Link from "next/link";

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

interface SortedProductsProps {
  products: Product[];
}

type SortOption = "default" | "low-to-high" | "high-to-low";

const SortedProducts = ({ products }: SortedProductsProps) => {
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "low-to-high") {
      return a.today - b.today;
    }

    if (sortBy === "high-to-low") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <div>
      <div className="mb-5 flex justify-end">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-green-500"
          aria-label="পণ্যের দাম অনুযায়ী সাজান"
        >
          <option value="default">ডিফল্ট</option>
          <option value="low-to-high">দাম: কম থেকে বেশি</option>
          <option value="high-to-low">দাম: বেশি থেকে কম</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<p>Loading…</p>}>
        {sortedProducts.map((product) => (
          <Link href={`/product/${product?.id}`} key={product?.id}>
          <AllProductCard product={product} />
          </Link>
        ))}
        </Suspense>
      </div>
    </div>
  );
};

export default SortedProducts;
