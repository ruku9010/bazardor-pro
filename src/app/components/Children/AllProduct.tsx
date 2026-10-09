
import { TriangleDownFill } from "@gravity-ui/icons";
import SortedProducts from "./SortedProducts";

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

const AllProduct = async () => {
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

  return (
    <section className="mx-auto my-8 w-[95%] max-w-7xl">
      <div className="mb-5 flex items-center gap-2">
        <TriangleDownFill className="text-xl text-green-500" />

        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            সব পণ্য
          </h2>

          <p>মোট {products.length}টি পণ্য দেখানো হচ্ছে</p>
        </div>
      </div>

      <SortedProducts products={products} />
    </section>
  );
};

export default AllProduct;
