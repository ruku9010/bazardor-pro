import { TriangleDownFill, TriangleUpFill } from "@gravity-ui/icons";
import { notFound } from "next/navigation";
import { Table } from "@heroui/react";

interface Product {
  market: string,
division: string,
min: number,
max: number
}

const ProductPage = async ({ params }: { params: { productId: string } }) => {
  const { productId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${productId}`,
  );

  const product = await res.json();

  if (!product) {
    notFound();
  }

  console.log(product);
  return (
    <>
      <div className="flex justify-between items-center w-7xl mx-auto my-4 p-8 bg-white rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-5 bg-[#F0F5F0] rounded-lg">
            <span>{product?.categoryIcon}</span>
          </div>
          <div>
            <div className="mb-2">
              <h1 className="text-3xl font-bold">{product?.nameBn}</h1>
              <p>
                প্রতি {product?.unit} {product?.categoryNameBn}
              </p>
            </div>
            {product?.change.dir === "up" ? (
              <>
                <span>
                  গতকালের তুলনায় আজ দাম বেড়েছে{" "}
                  {Math.abs(Number(product?.change?.pct))}%
                </span>
              </>
            ) : (
              <>
                <span>
                  গতকালের তুলনায় আজ দাম কমেছে{" "}
                  {Math.abs(Number(product?.change?.pct))}%
                </span>
              </>
            )}
          </div>
        </div>
        <div className="grid p-4 bg-[#F0F5F0] text-center rounded-2xl">
          <h2>আজকের দাম</h2>
          <span className="text-4xl font-bold">{product?.today}</span>
          <span>টাকা / কেজি</span>
          <div className="flex flex-col items-center">
            {product?.change?.dir === "up" ? (
              <>
                <span className="flex items-center gap-2">
                  <TriangleUpFill className="text-red-500" />
                  {Math.abs(Number(product?.change?.pct))}%
                </span>
              </>
            ) : (
              <>
                <span className="flex items-center gap-2">
                  <TriangleDownFill className="text-green-500" />
                  {Math.abs(Number(product?.change?.pct))}%
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-white border w-7xl mx-auto gap-2">
        <h3>দামের সারসংক্ষেপ</h3>
        <div className="p-3 rounded-2xl grid grid-cols-3 gap-3">
          <div className="border rounded-2xl p-4">
            <h3>সর্বনিম্ন দাম</h3>
            <span className="text-[#05893E]">
              {product?.markets?.[0]?.min} টাকা
            </span>
            <p>সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="border rounded-2xl p-4">
            <h3>সর্বাধিক দাম</h3>
            <span className="text-[#890505]">
              {product?.markets?.[0]?.max} টাকা
            </span>
            <p>সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="border rounded-2xl p-4">
            <h3>সর্বাধিক দাম</h3>
            <span className="text-blue-500">
              {product?.markets?.length
                ? Math.round(
                    product.markets.reduce(
                      (total, market) => total + (market.min + market.max) / 2,
                      0,
                    ) / product.markets.length,
                  )
                : 0}{" "}
              টাকা
            </span>
            <p>সবচেয়ে বেশি দামের বাজার</p>
          </div>
        </div>
        <h3 className="">বাজারভিত্তিক আজকের দাম</h3>

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
                {(product?.markets ?? []).map((market: Product, index: number) => {
                  const average = (market?.min + market?.max) / 2;

                  return (
                    <Table.Row key={`${market?.market}-${index}`}>
                      <Table.Cell>{market?.market}</Table.Cell>
                      <Table.Cell>{market?.division}</Table.Cell>
                      <Table.Cell>{market?.min} টাকা</Table.Cell>
                      <Table.Cell>{market?.max} টাকা</Table.Cell>
                      <Table.Cell>{average.toFixed(2)} টাকা</Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </>
  );
};

export default ProductPage;
