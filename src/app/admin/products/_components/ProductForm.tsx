"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/utils/formatters";
import { Product } from "@prisma/client";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { addProduct, updateProduct } from "../../_actions/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categoryOptions } from "@/config";
import { BeatLoader } from "react-spinners";
import { cn } from "@/lib/utils";

const ProductForm = ({ product }: { product?: Product | null }) => {
  const [error, action] = useFormState(
    product == null ? addProduct : updateProduct.bind(null, product.id),
    {}
  );

  const [priceInCents, setPriceInCents] = useState(
    product?.priceInCents || undefined
  );

  const priceInDollars =
    typeof priceInCents === "number" ? priceInCents / 100 : 0;

  const [offer, setOffer] = useState(product?.offer || 0);

  return (
    // space-y-8
    <form className=" mb-8 grid sm:grid-cols-2 gap-4" action={action}>
      {/* category */}

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select name="category" defaultValue={product?.category}>
          <SelectTrigger>
            <SelectValue placeholder="Select Your Product Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option, i) => (
              <SelectItem key={i} value={option.value}>
                {option.key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error.category && (
          <div className="text-destructive">{error.category}</div>
        )}
      </div>

      {/* name */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input type="text" id="name" name="name" defaultValue={product?.name} />
        {error.name && <div className="text-destructive">{error.name}</div>}
      </div>

      {/* price */}
      <div className="space-y-2">
        <Label htmlFor="priceInCents">Price In Cents</Label>
        <Input
          type="number"
          id="priceInCents"
          name="priceInCents"
          value={priceInCents}
          onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)}
        />

        <div className="text-[--sub-title]">
          {formatCurrency(
            (typeof priceInCents === "number" ? priceInCents : 0) / 100
          )}
        </div>

        {error.priceInCents && (
          <div className="text-destructive">{error.priceInCents}</div>
        )}
      </div>

      {/* offer */}
      <div className="space-y-2">
        <Label htmlFor="offer">Offer</Label>
        <Input
          type="number"
          id="offer"
          name="offer"
          value={offer}
          onChange={(e) => setOffer(Number(e.target.value))}
        />
        <div>
          <span className="text-[--sub-title]">{offer || 0}%</span>
          <span className="text-[--title-color]">
            {offer
              ? " The price will be : " +
                formatCurrency(priceInDollars - (priceInDollars / 100) * offer)
              : ""}
          </span>
        </div>

        {error.offer && <div className="text-destructive">{error.offer}</div>}
      </div>

      {/* quantity in stock */}
      <div className="space-y-2">
        <Label htmlFor="quantityInStock">Quantity In Stock</Label>
        <Input
          type="number"
          id="quantityInStock"
          name="quantityInStock"
          defaultValue={product?.quantityInStock}
        />
        {error.quantityInStock && (
          <div className="text-destructive">{error.quantityInStock}</div>
        )}
      </div>

      {/* image */}
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input type="file" id="image" name="image" className="cursor-pointer" />

        {error.image && <div className="text-destructive">{error.image}</div>}
      </div>

      {/* description */}
      <div className={cn("space-y-2", !product ? "col-span-2" : "")}>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={product?.description}
        />
        {error.description && (
          <div className="text-destructive">{error.description}</div>
        )}
        <SubmitBtn />
      </div>

      <div>
        {product != null && (
          <Image
            src={product.imagePath}
            height={800}
            width={800}
            alt="Product Iamge"
            className="rounded-md"
          />
        )}
      </div>
    </form>
  );
};

const SubmitBtn = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-[120px] bg-[--btn-color-2] !mt-4 hover:bg-[--btn-hover-color-2] !text-white"
    >
      {pending ? <BeatLoader size={12} color="white" /> : "Save"}
    </Button>
  );
};

export default ProductForm;
