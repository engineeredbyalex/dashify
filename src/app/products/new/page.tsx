"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Header from "@/app/components/ui/Header";
import PageHeader from "@/app/components/ui/PageHeader";
import Button from "@/app/components/ui/Button";
import ProductForm from "@/app/components/forms/ProductForm";

export default function CreateProduct() {
  return (
    <div>
      <Header />
      <div className="mx-28 py-9 flex flex-col">
        <PageHeader>
          <Button
            route="/products"
            text="Delete product"
            style="button_destructive"
          />
          <Button
            route="/products"
            text="Preview product"
            style="button_outline"
          />
          <Button
            route="/products"
            text="Save Product"
            style="button_primary"
          />
        </PageHeader>
      </div>
      <div className="mx-28 flex flex-col">
        <ProductForm />
      </div>
    </div>
  );
}
