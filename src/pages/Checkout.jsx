import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, placeOrder } = useAppContext();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    card: "",
    mobile: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      // Use the placeOrder function from your context
      // This function already handles creating the order and clearing the cart
      placeOrder({
        name: form.name,
        shippingAddress: form.address,
        mobile: form.mobile,
        paymentMethod: "Card",
        cardDetails: form.card, // Store safely or consider not storing this in production
      });

      // Show success message
      setOrderPlaced(true);
      console.log("Order placed successfully, redirecting soon...");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    }
  };

  useEffect(() => {
    if (orderPlaced) {
      console.log("Order placed state is true, starting redirect timer");

      const timer = setTimeout(() => {
        console.log("Redirecting to /myorders now");
        navigate("/myorders", {
          state: {
            success: true,
            message: "Your order has been placed successfully!",
          },
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [orderPlaced, navigate]);

  // Calculate order total
  const orderTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-6 sm:p-8 max-w-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
        Checkout
      </h2>
      {orderPlaced ? (
        <div className="bg-green-100 border border-green-400 text-green-700 p-4 rounded-lg text-center">
          <p className="text-lg sm:text-xl font-semibold mb-2">
            Order Placed Successfully!
          </p>
          <p>Redirecting to your orders page...</p>
        </div>
      ) : (
        <>
          {/* Order Summary */}
          <div className="bg-white p-4 shadow-md rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">
              Order Summary
            </h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-2 mb-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 font-semibold flex justify-between">
                  <span>Total:</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </>
            )}
          </div>

          {/* Checkout Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 shadow-md rounded-lg"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-yellow-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Shipping Address
              </label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-yellow-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Card Details
              </label>
              <input
                type="text"
                name="card"
                value={form.card}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-yellow-300 tracking-widest"
                required
                placeholder="XXXX-XXXX-XXXX-XXXX"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold">
                Mobile Number
              </label>
              <input
                type="tel"
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-yellow-300"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-500 text-black py-2 rounded-lg hover:bg-yellow-600 font-semibold"
              disabled={cartItems.length === 0}
            >
              Place Order
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
