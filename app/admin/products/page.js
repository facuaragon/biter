"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import TableSkeleton from "@/components/TableSkeleton";
import { withSwal } from "react-sweetalert2";

function Page({ swal }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(null);
  const fetchData = async () => {
    try {
      const [categoriesResponse, productsResponse] = await Promise.all([
        axios.get("/api/categories"),
        axios.get("/api/products"),
      ]);

      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setLoading(false);
    } catch (error) {
      setError("Hubo un error, intentelo nuevamente");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = (product) => {
    swal
      .fire({
        title: "¿Estás seguro?",
        text: `¿Quieres eliminar el producto "${product.name}"?`,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sí, Eliminar!",
        reverseButtons: true,
        confirmButtonColor: "#d55",
        didOpen: () => {},
        didClose: () => {},
      })
      .then(async (result) => {
        // console.log(result);
        if (result.isConfirmed) {
          const { _id } = product;
          await axios.delete(`/api/products?id=` + _id);
          fetchData();
        }
      });
  };

  return (
    <>
      <Link href={"/admin/products/new"} className="btn-primary">
        Agregar Producto
      </Link>
      {loading ? (
        <TableSkeleton />
      ) : error ? (
        <h1 className="mt-4 text-red-600">{error}</h1>
      ) : (
        <table className="basic mt-2">
          <thead>
            <tr>
              <td>Nombre</td>
              <td>Categoria</td>
              <td>Precios</td>
              <td>Presentación</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>
                  {categories.find(
                    (category) => category._id === product.category
                  )?.name || "Categoría no encontrada"}
                </td>
                <td>
                  {product.price
                    ? product.price
                    : product.serving.map(
                        (serving, index) =>
                          serving && (
                            <span key={index}>
                              {serving.description}: {serving.price}
                              {index < product.serving.length - 1 && <br />}
                            </span>
                          )
                      )}
                </td>
                <td>
                  <Link
                    href={"/admin/products/edit/" + product._id}
                    className="btn-default"
                  >
                    Editar
                  </Link>
                  <button
                    className="btn-red "
                    onClick={() => deleteProduct(product)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
export default withSwal(({ swal }, ref) => <Page swal={swal} />);
