"use client";
import TableSkeleton from "@/components/TableSkeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchCategories = () => {
    axios("/api/categories").then((response) => {
      // console.log(response.data);
      setCategories(response.data);
      setLoading(false);
    });
  };
  useEffect(() => {
    setLoading(true);
    fetchCategories();
  }, []);

  const saveCategory = async (e) => {
    e.preventDefault();
    setMessage("");
    const data = {
      name,
    };
    // console.log(editedCategory);
    if (!editedCategory) {
      const res = await axios.post("/api/categories", data);
      //   console.log(res);
      if (res.data?.message === "Category already exists") {
        setMessage(res.data.message);
      }
    } else {
      data._id = editedCategory._id;
      const res = await axios.put("/api/categories", data);
      //   console.log(res);
    }
    setName("");
    setEditedCategory(null);
    fetchCategories();
  };
  const editCategory = (category) => {
    // console.log(category.properties);
    // console.log(category);
    setEditedCategory(category);
    setName(category.name);
  };
  const deleteCategory = (category) => {
    swal
      .fire({
        title: "¿Estás seguro?",
        text: `¿Quieres eliminar la categoría "${category.name}"?`,
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
          const { _id } = category;
          await axios.delete(`/api/categories?_id=` + _id);
          fetchCategories();
        }
      });
  };

  return (
    <>
      <h1>Categorías</h1>
      <label className=" text-lg">
        {editedCategory
          ? `Editar Categoría "${editedCategory.name}":`
          : "Crear Nueva Categoría:"}
      </label>
      {message && (
        <span className="bg-red-500 px-2 rounded-md text-white text-xs ml-2">
          {message}
        </span>
      )}
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            name="category"
            placeholder="Nombre de la Categoría"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              className="btn-default py-1 hover:scale-110"
              onClick={() => {
                setEditedCategory(null);
                setName("");
              }}
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="btn-primary py-1 hover:scale-110 ml-2"
          >
            Crear
          </button>
        </div>
      </form>
      {!editedCategory && loading ? (
        <TableSkeleton />
      ) : (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Nombre</td>
              <td>Acciones</td>
            </tr>
          </thead>
          <tbody>
            {!!categories.length > 0 &&
              categories?.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>
                    <button
                      className="btn-default mr-2 hover:scale-110"
                      onClick={() => {
                        editCategory(category);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      className="btn-red hover:scale-110"
                      onClick={() => deleteCategory(category)}
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
export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
