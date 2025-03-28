import { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Products } from "../data/Products";

const AdminProducts = () => {
  const [products, setProducts] = useState(Products);
  const [showForm, setShowForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: "",
    imageUrl: "",
    price: "",
  });
  const [previewImage, setPreviewImage] = useState(null);

  const updateStock = (id, change) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, stock: product.stock + change }
          : product
      )
    );
  };

  const stockOut = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, stock: 0 } : product
      )
    );
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setNewProduct({ ...newProduct, image: imageUrl });
    }
  };

  const handleAddProduct = () => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setNewProduct({ name: "", stock: "", image: null, price: "" });
    setPreviewImage(null);
    setShowForm(false);
  };

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl font-bold">Products</h1>

      <div className="flex justify-between items-center mt-5">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border p-2 pl-8 rounded-md w-80"
          />
          <FaSearch className="absolute left-2 top-3 text-gray-500" />
        </div>

        {/* Add Product Button */}
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setShowForm(true)}
        >
          <FaPlus className="mr-2" /> Add Product
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden mt-5">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4 text-left border-b">Product</th>
              <th className="p-4 text-center border-b">Stock</th>
              <th className="p-4 text-center border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                {/* Product Image & Name */}
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <span className="font-semibold">{product.name}</span>
                </td>

                {/* Stock */}
                <td className="p-4 text-center font-medium">{product.stock}</td>

                {/* Action Buttons */}
                <td className="p-4 text-center flex justify-center gap-2">
                  <button
                    onClick={() => updateStock(product.id, -1)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
                  >
                    -1
                  </button>
                  <button
                    onClick={() => updateStock(product.id, 1)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded"
                  >
                    +1
                  </button>
                  <button
                    onClick={() => stockOut(product.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Stock Out
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Product Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-3">Add Product</h2>
            <input
              type="text"
              placeholder="Name"
              className="border p-2 w-full mb-2"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Stock"
              className="border p-2 w-full mb-2"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Price"
              className="border p-2 w-full mb-2"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              className="border p-2 w-full mb-2"
              onChange={handleImageUpload}
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-32 object-cover mt-2 rounded"
              />
            )}

            <div className="flex justify-end mt-3">
              <button
                className="bg-gray-300 px-4 py-2 mr-2 rounded-md"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
                onClick={handleAddProduct}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
