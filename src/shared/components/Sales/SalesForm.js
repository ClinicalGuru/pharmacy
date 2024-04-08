import React, { useState } from 'react';

const MedicineForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    pharmacologicalName: '',
    brandName: '',
    batchNo: '',
    hsnCode: '',
    price: '',
    quantity: '',
    discount: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    // Optionally, you can reset the form after submission
    setFormData({
      pharmacologicalName: '',
      brandName: '',
      batchNo: '',
      hsnCode: '',
      price: '',
      quantity: '',
      discount: '',
      amount: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="pharmacologicalName" value={formData.pharmacologicalName} onChange={handleChange} placeholder="Pharmacological Name" />
      <input type="text" name="brandName" value={formData.brandName} onChange={handleChange} placeholder="Brand Name" />
      <input type="text" name="batchNo" value={formData.batchNo} onChange={handleChange} placeholder="Batch Number" />
      <input type="number" name="hsnCode" value={formData.hsnCode} onChange={handleChange} placeholder="HSN Code" />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" />
      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" />
      <input type="number" name="discount" value={formData.discount} onChange={handleChange} placeholder="Discount" />
      <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MedicineForm;
