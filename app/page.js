"use client";
import Menu from "@/components/Menu/Menu";
import styles from "./styles.module.css";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function Home() {
  const [error, setError] = useState("");
  const [logo, setLogo] = useState(true);
  const [menu, setMenu] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(null);

  const fetchData = async () => {
    try {
      const [categoriesResponse, productsResponse] = await Promise.all([
        axios.get("/api/categories"),
        axios.get("/api/products"),
      ]);
      // console.log(productsResponse.data);
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);

      if (categoriesResponse.data && productsResponse.data) {
        setTimeout(() => {
          setLogo(false);
          setMenu(true);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      setError("Hubo un error, inténtelo nuevamente");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.logo}>
      <CSSTransition
        in={logo}
        timeout={{
          exit: 1000,
          appear: 1500,
        }}
        appear={true}
        classNames={{
          appear: styles.logoappear,
          appearDone: styles.logoappearDone,
          appearActive: styles.logoappearActive,
          exit: styles.logoexit,
          exitDone: styles.logoexitDone,
          exitActive: styles.logoexitActive,
        }}
      >
        <div className={styles.logofixed}>
          <img src="/biter.png" alt="Biter" />
        </div>
      </CSSTransition>
      {menu && <Menu categories={categories} products={products} />}
    </div>
  );
}
