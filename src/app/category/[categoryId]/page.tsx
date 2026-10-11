import SortedCategoryProducts from "@/app/components/Children/SortedCategoryProducts";
import { Button } from "@heroui/react";
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

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`,
    {
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    return <p>পণ্য লোড করা যায়নি।</p>;
  }

  const products: Product[] = await res.json();

  const category = products[0];

  return (
    <div className="mx-auto my-4 w-[96%]">
      <div className="mb-6 flex items-center gap-4 rounded-2xl bg-white p-8 border">
        <div className="rounded-lg bg-[#F0F5F0] p-3">
          <span className="text-3xl">
            {category?.categoryIcon}
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            {category?.categoryNameBn}
          </h1>

          <p>{products.length} টি পণ্যের আজকের দাম ও পরিবর্তন</p>
        </div>
      </div>

      <SortedCategoryProducts products={products} />
      <Link href="/" ><Button className="mt-5">হোম পেজে ফিরে যান</Button></Link>
    </div>
  );
};

export default CategoryPage;
