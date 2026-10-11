
import { TriangleDownFill, TriangleUpFill } from "@gravity-ui/icons";
import { notFound } from "next/navigation";
import { Table } from "@heroui/react";
import {
  formatChange,
  formatPrice,
  formatUnit,
} from "../../utils/priceFormatter";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
    {
      next: {
        revalidate: 300,
      },
    },
  );

  if (!res.ok) {
    notFound();
  }

  const product = await res.json();

  if (!product) {
    notFound();
  }

  const markets: Market[] = product.markets ?? [];

  const direction = product?.change?.dir?.toLowerCase();
  const isPriceUp = direction === "up";
  const isPriceDown = direction === "down";
  const isPriceFlat = !isPriceUp && !isPriceDown;

  const changePercentage = Math.abs(
    Number(product?.change?.pct ?? 0),
  );

  const averagePrice = markets.length
    ? Math.round(
        markets.reduce(
          (total, market) => total + (market.min + market.max) / 2,
          0,
        ) / markets.length,
      )
    : 0;

  const minimumPrice = markets.length
    ? Math.min(...markets.map((market) => market.min))
    : 0;

  const maximumPrice = markets.length
    ? Math.max(...markets.map((market) => market.max))
    : 0;

  const changeColor = isPriceUp
    ? "text-red-500"
    : isPriceDown
      ? "text-green-600"
      : "text-gray-500";

  const changeMessage = isPriceUp
    ? "গতকালের তুলনায় আজ দাম বেড়েছে"
    : isPriceDown
      ? "গতকালের তুলনায় আজ দাম কমেছে"
      : "গতকালের তুলনায় আজ দাম অপরিবর্তিত";

  return (
    <main className="mx-auto w-full max-w-7xl space-y-5 px-3 py-4 sm:px-5 sm:py-6 lg:px-8">
      <section className="flex flex-col gap-5 rounded-2xl bg-white p-4 shadow-md sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:p-8">
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
          <div className="flex shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] p-4 text-2xl sm:p-5">
            <span>{product?.categoryIcon}</span>
          </div>

          <div className="min-w-0">
            <h1 className="break-words text-xl font-bold sm:text-2xl lg:text-3xl">
              {product?.nameBn}
            </h1>

            <p className="mt-1 text-sm text-gray-600 sm:text-base">
              {formatUnit(product?.unit ?? "")}{" "}
              {product?.categoryNameBn}
            </p>

            <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
              {changeMessage}{" "}
              <span className={`font-semibold ${changeColor}`}>
                {isPriceFlat
                  ? "—"
                  : isPriceUp
                    ? "▲"
                    : "▼"}{" "}
                {formatChange(changePercentage)}%
              </span>
            </p>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 items-center gap-3 rounded-2xl bg-[#F0F5F0] p-4 sm:p-5 lg:w-64 lg:shrink-0 lg:grid-cols-1 lg:text-center">
          <div>
            <h2 className="text-sm text-gray-600 sm:text-base">
              আজকের দাম
            </h2>

            <p className="mt-1 text-2xl font-bold sm:text-4xl">
              {formatPrice(product?.today ?? 0)}
            </p>

            <span className="text-sm text-gray-600">
              {formatUnit(product?.unit ?? "")}
            </span>
          </div>

          <div className="flex flex-col items-end justify-center lg:items-center">
            <span
              className={`flex items-center gap-2 font-semibold ${changeColor}`}
            >
              {isPriceUp ? (
                <TriangleUpFill />
              ) : isPriceDown ? (
                <TriangleDownFill />
              ) : (
                <span>—</span>
              )}

              {formatChange(changePercentage)}%
            </span>

            <span className="mt-1 text-xs text-gray-500 sm:text-sm">
              গতকালের তুলনায়
            </span>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border bg-white p-4 sm:p-6">
        <h2 className="mb-4 text-lg font-bold sm:text-xl">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border p-4 sm:p-5">
            <h3 className="text-sm text-gray-600 sm:text-base">
              সর্বনিম্ন দাম
            </h3>

            <p className="mt-2 text-xl font-bold text-[#05893E] sm:text-2xl">
              {formatPrice(minimumPrice)}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              সবচেয়ে কম দামের বাজার
            </p>
          </div>

          <div className="rounded-2xl border p-4 sm:p-5">
            <h3 className="text-sm text-gray-600 sm:text-base">
              সর্বাধিক দাম
            </h3>

            <p className="mt-2 text-xl font-bold text-[#890505] sm:text-2xl">
              {formatPrice(maximumPrice)}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          <div className="rounded-2xl border p-4 sm:col-span-2 sm:p-5 lg:col-span-1">
            <h3 className="text-sm text-gray-600 sm:text-base">
              গড় দাম
            </h3>

            <p className="mt-2 text-xl font-bold text-blue-500 sm:text-2xl">
              {formatPrice(averagePrice)}
            </p>

            <p className="mt-1 text-sm text-gray-500">
              সব বাজারের গড় মূল্য
            </p>
          </div>
        </div>

        <h2 className="mb-3 mt-7 text-lg font-bold sm:mt-8 sm:text-xl">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="w-full overflow-x-auto rounded-xl border">
          <Table>
            <Table.ScrollContainer>
              <Table.Content
                aria-label="বাজারভিত্তিক আজকের দাম"
                className="min-w-[600px]"
              >
                <Table.Header>
                  <Table.Column isRowHeader>বাজার</Table.Column>
                  <Table.Column>বিভাগ</Table.Column>
                  <Table.Column>সর্বনিম্ন</Table.Column>
                  <Table.Column>সর্বাধিক</Table.Column>
                  <Table.Column>গড়</Table.Column>
                </Table.Header>

                <Table.Body>
                  {markets.map((market, index) => {
                    const average = (market.min + market.max) / 2;

                    return (
                      <Table.Row key={`${market.market}-${index}`}>
                        <Table.Cell>{market.market}</Table.Cell>
                        <Table.Cell>{market.division}</Table.Cell>
                        <Table.Cell>
                          {formatPrice(market.min)}
                        </Table.Cell>
                        <Table.Cell>
                          {formatPrice(market.max)}
                        </Table.Cell>
                        <Table.Cell>
                          {formatPrice(average)}
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </div>
      </section>
    </main>
  );
};

export default ProductPage;
