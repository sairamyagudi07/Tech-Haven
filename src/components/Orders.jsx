import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";

const Orders = () => {
  const { orders, setOrders, userRole } = useAppContext();
  const currentUser = "User1"; // Replace with actual logged-in user
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("date");

  // Load orders from localStorage only once when component mounts
  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders)); // Ensure it's correctly parsed before setting state
      } catch (error) {
        console.error("Failed to parse orders from localStorage:", error);
      }
    }
  }, [setOrders]);

  // Show only user’s orders (if not admin)
  let filteredOrders =
    userRole === "admin"
      ? orders
      : orders.filter((order) => order.user === currentUser);

  // Apply search filter
  filteredOrders = filteredOrders.filter(
    (order) =>
      order.id.includes(search) ||
      order.user.toLowerCase().includes(search.toLowerCase())
  );

  // Apply status filter
  if (filterStatus !== "All") {
    filteredOrders = filteredOrders.filter(
      (order) => order.status === filterStatus
    );
  }

  // Sorting logic
  filteredOrders.sort((a, b) => {
    if (sortOption === "date") return b.id - a.id; // Latest orders first
    if (sortOption === "total") return b.total - a.total; // Highest total first
    if (sortOption === "status") return a.status.localeCompare(b.status);
  });

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">
        {userRole === "admin" ? "All Orders" : "My Orders"}
      </h2>

      {/* Filters & Search */}
      <div className="flex space-x-4 mb-4">
        <input
          type="text"
          placeholder="Search Order ID or User"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 w-1/3"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2"
        >
          <option value="date">Sort by Date</option>
          <option value="total">Sort by Total</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <table className="w-full border-collapse bg-white p-4 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Order ID</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Total</th>
              <th className="p-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.user}</td>
                <td className="p-2">${order.total}</td>
                <td className="p-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
