
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
        product.category,
        {
          id: product.category,
          nameBn: product.categoryNameBn,
          icon: product.categoryIcon,
        },
      ])
    ).values()
  );

  return (
    <nav className="w-full border-b bg-white">
      <ul className="mx-auto flex w-full max-w-7xl list-none items-center gap-2 overflow-x-auto overscroll-x-contain px-3 py-3 sm:gap-3 sm:px-5 md:gap-4 lg:px-8">
        {categories.map((category) => (
          <li key={category.id} className="shrink-0">
            <CategoryLink
              id={category.id}
              icon={category.icon}
              nameBn={category.nameBn}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navlinks;
