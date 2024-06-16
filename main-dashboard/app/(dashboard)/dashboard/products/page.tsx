"use client"
import React, { useState } from 'react';

const Page = () => {
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [image1, setImage1] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('price', price);
    formData.append('size', size);
    formData.append('stock', stock);
    formData.append('description', description);
    formData.append('name', name);
    formData.append('image1', image1);
    formData.append('additional',"hei");
    formData.append('enabled','y');
    formData.append('category_id',1);

    try {
      const response = await fetch('http://localhost:8012/api/v1/vendor/1/product/admin', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Form submitted successfully!');
        // Reset form fields
        setPrice('');
        setSize('');
        setStock('');
        setDescription('');
        setName('');
        setImage1(null);
        event.target.reset(); // Reset file input field
      } else {
        alert('Error submitting form!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form!');
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>


        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="size" className="block text-sm font-medium text-gray-700">
            Size
          </label>
          <input
            type="text"
            id="size"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="text"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="image1" className="block text-sm font-medium text-gray-700">
            Image
          </label>
          <input
            type="file"
            id="image1"
            accept="image/*"
            onChange={(e) => setImage1(e.target.files[0])}
            required
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;

