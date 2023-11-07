"use client";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DeleteProduct() {
  const router = useRouter();
  const { id } = useParams();
  const [productInfo, setProductInfo] = useState(null);
  const [categories, setCategories] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      const fetchData = async () => {
        try {
          const [productsResponse] = await Promise.all([
            axios.get("/api/products?id=" + id),
          ]);

          setProductInfo(productsResponse.data);
          setLoading(false);
        } catch (error) {
          setError("Hubo un error, intentelo nuevamente");
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);
  const goBack = () => {
    router.push("/admin/products");
  };
  const deleteProduct = async () => {
    await axios.delete("/api/products?id=" + id);
    goBack();
  };
  return (
    <>
      {productInfo && (
        <>
          <h1 className="text-center">
            Do you really want to delete &quot;{productInfo.name}&quot;?
          </h1>
          <div className="flex gap-2 justify-center">
            <button className="btn-red" onClick={deleteProduct}>
              YES
            </button>
            <button className="btn-default" onClick={goBack}>
              NO
            </button>
          </div>
        </>
      )}
    </>
  );
}
