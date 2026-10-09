
import { TriangleUpFill } from "@gravity-ui/icons";
import React from "react";
import ProductCard from "./Product/ProductCard";

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

const IncreasedProduct = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 300,
      },
    },
  );

  if (!res.ok) {
    return null;
  }

  const increasedProducts: Product[] = await res.json();

  const products = increasedProducts.filter(
    (product) => product.change?.dir === "up",
  );

  return (
    <section className="w-[95%] max-w-7xl mx-auto my-8">
      <div className="mb-5 flex items-center gap-2">
        <TriangleUpFill className="text-red-500 text-xl" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          আজ দাম বেড়েছে
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default IncreasedProduct;
