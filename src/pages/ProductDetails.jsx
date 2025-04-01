import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import products from "../data/Products";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useAppContext();
  const [showToast, setShowToast] = useState(false);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500 font-bold text-xl">
          Product not found!
        </p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);

    // Show "Product Added" toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4 sm:p-6 lg:p-8">
        {/* Image Container */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain mb-4"
          />
        </div>

        {/* Product Info */}
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          {product.name}
        </h2>
        <p className="text-gray-700 text-sm sm:text-base">{product.description}</p>
        <p className="text-red-600 font-bold text-lg sm:text-xl mt-2">
          ${product.price}
        </p>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-6 rounded font-semibold"
        >
          Add to Cart
        </button>
      </div>

      {/* Toast Notification (Fixed on top-right) */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          Product added to the cart!
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
