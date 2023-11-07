"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function EditProduct() {
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/products?id=" + id).then((response) => {
      // console.log(response.data);
      setProductInfo(response.data);
    });
  }, [id]);
  return (
    <>
      <h1>Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </>
  );
}
