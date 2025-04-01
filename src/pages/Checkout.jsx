import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, setCartItems } = useAppContext();
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

    const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const newOrders = cartItems.map((item) => ({
      id: `order-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      productId: item.id,
      name: form.name,
      shippingAddress: form.address,
      mobile: form.mobile,
      total: item.price,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
    }));

    localStorage.setItem("orders", JSON.stringify([...existingOrders, ...newOrders]));
    setCartItems([]);
    setOrderPlaced(true);
  };

  useEffect(() => {
    if (orderPlaced) {
      setTimeout(() => {
        navigate("/myorders");
      }, 2000);
    }
  }, [orderPlaced, navigate]);

  return (
    <div className="container mx-auto px-4 py-6 sm:p-8 max-w-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Checkout</h2>
      {orderPlaced ? (
        <div className="text-center text-green-600 text-lg sm:text-xl font-semibold">
          Order Placed Successfully! Redirecting...
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Full Name</label>
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
            <label className="block text-gray-700 font-semibold">Shipping Address</label>
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
            <label className="block text-gray-700 font-semibold">Card Details</label>
            <input
              type="text"
              name="card"
              value={form.card}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded mt-1 focus:ring focus:ring-yellow-300 tracking-widest"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Mobile Number</label>
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
            className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 font-semibold"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
