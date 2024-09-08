import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './cycle.module.css';

function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    brand: '',
    sku: '',
    weight: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Product Data:', formData);
    navigate('/'); // Redirect ke list produk setelah submit
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Title: <input type="text" name="title" value={formData.title} onChange={handleChange} /></label>
        <label>Description: <input type="text" name="description" value={formData.description} onChange={handleChange} /></label>
        <label>Price: <input type="number" name="price" value={formData.price} onChange={handleChange} /></label>
        <label>Brand: <input type="text" name="brand" value={formData.brand} onChange={handleChange} /></label>
        <label>SKU: <input type="text" name="sku" value={formData.sku} onChange={handleChange} /></label>
        <label>Weight: <input type="number" name="weight" value={formData.weight} onChange={handleChange} /></label>
        <button type="submit" className={styles.submitButton}>Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
