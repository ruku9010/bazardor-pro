
import React from "react";
import CategoryLink from "./CategoryLink";

interface Product {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
}

interface Category {
  id: string;
  nameBn: string;
  icon: string;
}

const Navlinks = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      next: {
        revalidate: 300,
      },
    }
  );

  if (!res.ok) {
    return null;
  }

  const products: Product[] = await res.json();

  const categories: Category[] = Array.from(
    new Map(
      products.map((product) => [
        product?.category,
        {
          id: product?.category,
          nameBn: product?.categoryNameBn,
          icon: product?.categoryIcon,
        },
      ])
    ).values()
  );

  return (
    <ul className="flex gap-4 w-7xl mx-20 list-none p-2 items-center overflow-x-auto">
      {categories.map((category) => (
        <li key={category.id}>
          <CategoryLink
            id={category.id}
            icon={category.icon}
            nameBn={category.nameBn}
            
          />
        </li>
      ))}
    </ul>
  );
};

export default Navlinks;
