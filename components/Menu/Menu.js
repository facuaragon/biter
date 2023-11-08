import styles from "./styles.module.css";

export default function Menu({ categories, products }) {
  return (
    <>
      <div className={styles.menu}>
        <div className={styles.menuGrid}>
          {categories?.map((category) => (
            <div key={category._id} className={styles.categorySection}>
              <h1 className={styles.categoryName}>{category.name}</h1>
              <div className={styles.hr}></div>
              {products.map((product) => {
                if (product.category === category._id) {
                  return (
                    <div key={product._id} className={styles.productCard}>
                      <h1 className={styles.productTitle}>{product.name}</h1>
                      {product.price ? (
                        <p
                          className={styles.productPrice}
                        >{`$ ${product.price}`}</p>
                      ) : !!product.serving.length ? (
                        <div className={styles.serving}>
                          {product.serving.map((serving) => (
                            <div
                              key={serving.description}
                              className={styles.servingUnit}
                            >
                              <div className={styles.servingUnitTitle}>
                                {serving.description}
                              </div>
                              <div>{`$ ${serving.price}`}</div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div>-</div>
                      )}
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
