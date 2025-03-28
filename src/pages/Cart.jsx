import { useAppContext } from "../context/AppContext";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, updateCartQuantity, removeFromCart } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-lg shadow flex items-center justify-between"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-1 ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateCartQuantity(item.id, -1)}
                  className="bg-gray-300 text-black px-3 py-1 rounded"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateCartQuantity(item.id, 1)}
                  className="bg-gray-300 text-black px-3 py-1 rounded"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          {/* Checkout Button */}
          <div className="mt-6 text-right">
            <Link to="/checkout">
              <button className="bg-yellow-500 text-black px-6 py-2 rounded font-semibold">
                Go to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
