import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import products from "../data/Products";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const { userRole, addToCart } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = (product, event) => {
    event.stopPropagation(); // Prevent navigation to product details
    if (userRole === "admin") {
      setShowModal(true); // Show the dialog for admins
    } else {
      addToCart(product); // Add to cart for users
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-900">
        Our Products
      </h2>

      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col transition-transform transform hover:scale-105"
          >
            <Link to={`/product/${product.id}`} className="block">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 sm:h-48 object-contain mb-4"
              />
              <h3 className="text-lg sm:text-xl font-semibold">{product.name}</h3>
              <p className="text-red-600 font-bold text-sm sm:text-base">
                ${product.price}
              </p>
            </Link>

            {/* Add to Cart Button */}
            <button
              className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded font-bold w-full"
              onClick={(e) => handleAddToCart(product, e)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Admin Warning Dialog (Responsive) */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-sm">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-red-600">
              Admins cannot add products to cart.
            </h3>
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification (Fixed & Responsive) */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg text-sm sm:text-base">
          Product added to the cart!
        </div>
      )}
    </div>
  );
};

export default ProductsList;
