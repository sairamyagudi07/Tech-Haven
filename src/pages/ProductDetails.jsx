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
    return <div className="text-center text-red-500 font-bold text-xl">Product not found!</div>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    
    // Show "Product Added" toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000); 
  };

  return (
    <div className="container mx-auto p-6 relative">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <img src={product.image} alt={product.name} className="w-full h-80 object-contain mb-4" />
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-red-600 font-bold text-xl mt-2">${product.price}</p>
        
        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>

      {/* Toast Notification (Top-Right Near Cart Button) */}
      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white py-2 px-4 rounded shadow-lg">
          Product added to the cart!
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
