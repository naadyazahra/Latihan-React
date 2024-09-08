import React, { useState, useEffect } from 'react';
import styles from './cycle.module.css';
import { Link } from 'react-router-dom';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({ limit: 9, skip: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await fetch(`https://dummyjson.com/products?limit=${params.limit}&skip=${params.skip}`);
        const data = await result.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [params]);

  const handleNextClick = () => {
    setParams((prevParams) => ({
      ...prevParams,
      skip: prevParams.skip + prevParams.limit,
    }));
  };

  const handlePrevClick = () => {
    setParams((prevParams) => ({
      ...prevParams,
      skip: Math.max(prevParams.skip - prevParams.limit, 0),
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Products</h1>
        <Link to="/products/add">
          <button className={styles.addProductButton}>Create New Product</button>
        </Link>
      </div>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className={styles.productsContainer}>
            {products.length > 0 ? (
              products.map((product, idx) => (
                <div key={idx} className={styles.productsItem}>
                  <img
                    className={styles.productsItemCover}
                    src={product.images[0]}
                    alt={`product-cover-${idx}`}
                  />
                  <span>{product.title}</span>
                </div>
              ))
            ) : (
              <div>No products available</div>
            )}
          </div>
        )}
      </div>
      <div className={styles.paginationContainer}>
        <button onClick={handlePrevClick} disabled={params.skip === 0}>Prev</button>
        <button onClick={handleNextClick} disabled={products.length < params.limit}>Next</button>
      </div>
    </div>
  );
}

export default Products;
