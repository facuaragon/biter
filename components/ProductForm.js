"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductForm({
  _id,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  category: existingCategory,
  serving: existingServings,
}) {
  const [name, setName] = useState(existingName || "");
  const [description, setDescription] = useState(existingDescription || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [category, setCategory] = useState(existingCategory || "");
  const [serving, setServing] = useState(existingServings || []);

  const [goToProducts, setGoToProducts] = useState(false);
  const [categories, setCategories] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [message, setMessage] = useState("");

  const router = useRouter();

  useEffect(() => {
    axios.get("/api/categories").then((result) => {
      setCategories(result.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      price,
      category,
      serving: serving,
    };
    if (_id) {
      //update
      await axios.put("/api/products", { ...data, _id });
    } else {
      //create
      await axios.post("/api/products", data);
    }
    router.push("/admin/products");
  };
  // if (goToProducts) {
  //   router.push("/admin/products");

  // }

  const addServing = () => {
    let text;
    setMessage("");
    setDisabled(true);
    for (let i = 0; i < serving.length; i++) {
      if (serving[i].description === "" || serving[i].price === "") {
        text = "Debes completar la presentación anterior para agregar otra";
        setMessage(text);
      }
    }
    if (!text) {
      setServing((prev) => [...prev, { description: "", price: "" }]);
      setPrice("");
    }
  };
  const handleServingChange = (index, fieldName, value) => {
    setServing((prev) => {
      const updatedServing = [...prev];
      updatedServing[index] = {
        ...updatedServing[index],
        [fieldName]: value,
      };
      return updatedServing;
    });
  };

  const deleteServing = (index) => {
    setMessage("");
    setServing((prev) => {
      const updatedServing = [...prev];
      updatedServing.splice(index, 1);
      if (!updatedServing.length) {
        setDisabled(false);
      }
      return updatedServing;
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* NAME */}
        <label>Nombre del Producto:</label>
        <input
          type="text"
          placeholder="Nombre"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        {/* CATEGORY */}
        <label>Categoría:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="" disabled>
            Sin Categoría
          </option>
          {!!categories.length > 0 &&
            categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
        </select>

        {/* DESCRIPTION */}
        <label>Descripción (opcional):</label>
        <textarea
          placeholder="Descripción"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        {/* PRICE */}
        <label>Precio:</label>
        <input
          type="number"
          placeholder="Precio"
          name="price"
          value={price}
          disabled={disabled}
          onChange={(e) => setPrice(e.target.value)}
        ></input>

        {/* SERVINGS */}
        <div className="mb-3">
          <div onClick={addServing} className=" flex cursor-pointer ml-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="ml-2">Añadir presentacion</p>{" "}
          </div>
          <span className="ml-5 text-sm text-red-600 align-baseline">
            {message}
          </span>
          {!!serving.length && (
            <div className="ml-4">
              {serving.map((serving, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex gap-3 ml-3 mt-2">
                    <label>
                      Descripción:
                      <input
                        name="description"
                        value={serving.description}
                        placeholder=" ej: Copa, Botella"
                        onChange={(e) =>
                          handleServingChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </label>
                    <label>
                      Precio:
                      <input
                        name="price"
                        type="number"
                        value={serving.price}
                        onChange={(e) =>
                          handleServingChange(index, "price", e.target.value)
                        }
                      />
                    </label>
                  </div>
                  <div
                    onClick={() => deleteServing(index)}
                    className="cursor-pointer flex ml-3 mt-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <p className="ml-2 ">Eliminar presentacion</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SUBMIT BUTTON */}
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </>
  );
}
