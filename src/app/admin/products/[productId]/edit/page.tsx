import Heading from "@/components/common/Heading";
import db from "@/db/db";
import ProductForm from "../../_components/ProductForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

const EditProductPage = async ({
  params: { productId },
}: {
  params: { productId: string };
}) => {
  const product = await db.product.findUnique({ where: { id: productId } });
  if (!product) return notFound();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Edit Product" location="admin / products / edit" />
        <Button
          className="bg-[--btn-color] hover:bg-[--btn-hover-color]"
          asChild
        >
          <Link
            href={"/admin/products/products-table"}
            className=" !text-white"
          >
            Back To Products Table
          </Link>
        </Button>
      </div>

      <ProductForm product={product} />
    </>
  );
};

export default EditProductPage;
