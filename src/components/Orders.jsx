import { useAppContext } from "../context/AppContext";
import { useState, useEffect } from "react";

const Orders = () => {
  const { orders, setOrders, userRole } = useAppContext();
  const currentUser = "User1"; // Replace with actual logged-in user
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOption, setSortOption] = useState("date");

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error("Failed to parse orders from localStorage:", error);
      }
    }
  }, [setOrders]);

  // Filter and sort logic
  let filteredOrders = userRole === "admin"
    ? orders
    : orders.filter((order) => order.user === currentUser);

  filteredOrders = filteredOrders.filter(
    (order) =>
      order.id.includes(search) ||
      order.user.toLowerCase().includes(search.toLowerCase())
  );

  if (filterStatus !== "All") {
    filteredOrders = filteredOrders.filter((order) => order.status === filterStatus);
  }

  filteredOrders.sort((a, b) => {
    if (sortOption === "date") return b.id - a.id;
    if (sortOption === "total") return b.total - a.total;
    if (sortOption === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center md:text-left">
        {userRole === "admin" ? "All Orders" : "My Orders"}
      </h2>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
        <input
          type="text"
          placeholder="Search Order ID or User"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-full sm:w-auto px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
        >
          <option value="date">Sort by Date</option>
          <option value="total">Sort by Total</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Orders Table/List */}
      {filteredOrders.length === 0 ? (
        <p className="text-gray-500 text-center text-sm sm:text-base py-8">
          No orders found.
        </p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse bg-white rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm">
                  <th className="p-3 sm:p-4 text-left font-semibold">Order ID</th>
                  <th className="p-3 sm:p-4 text-left font-semibold">User</th>
                  <th className="p-3 sm:p-4 text-left font-semibold">Total</th>
                  <th className="p-3 sm:p-4 text-left font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 sm:p-4 text-sm">{order.id}</td>
                    <td className="p-3 sm:p-4 text-sm">{order.user}</td>
                    <td className="p-3 sm:p-4 text-sm">${order.total}</td>
                    <td className="p-3 sm:p-4 text-sm">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg p-4 sm:p-5"
              >
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm">Order ID:</span>
                    <span className="text-sm">{order.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm">User:</span>
                    <span className="text-sm">{order.user}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm">Total:</span>
                    <span className="text-sm">${order.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm">Status:</span>
                    <span className="text-sm">{order.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
