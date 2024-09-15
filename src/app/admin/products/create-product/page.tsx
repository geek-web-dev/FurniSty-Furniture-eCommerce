"use client";
import Heading from "@/components/common/Heading";
import React from "react";
import ProductForm from "../_components/ProductForm";
import LinkButton from "@/components/common/LinkButton";

const CreateProjectPage = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title="Create Project"
          location="admin / products / create-product"
        />
        <LinkButton
          title="Back To Products Table"
          href="/admin/products/products-table"
        />
      </div>
      <ProductForm />
    </>
  );
};

export default CreateProjectPage;
