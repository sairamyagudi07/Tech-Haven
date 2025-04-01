import React from "react";
import { useAppContext } from "../context/AppContext";

const AdminOrders = () => {
  const { orders } = useAppContext();
  const sampleAddresses = [
    "8502 Preston Rd, Inglewood, Maine 98380",
    "2715 Ash Dr, San Jose, South Dakota 83475",
    "1901 Thornridge Cir, Shiloh, Hawaii 81063",
    "6391 Elgin St, Celina, Delaware 10299",
    "4010 Parker Rd, Allentown, New Mexico 31134",
    "2464 Royal Ln, Mesa, New Jersey 45435",
  ];
  
  const randomAddresses = Array.from(
    { length: orders.length },
    () => sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)]
  );
  
  return (
    <div className="w-full container mx-auto p-6 bg-white shadow-lg rounded-lg overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[600px] border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-gray-700 border-b border-gray-300">
              <th className="p-4 text-left text-sm sm:text-base">Order ID</th>
              <th className="p-4 text-left text-sm sm:text-base">Total</th>
              <th className="p-4 text-left text-sm sm:text-base">Address</th>
              <th className="p-4 text-left text-sm sm:text-base">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id} className="border-b border-gray-300 text-sm sm:text-base">
                <td className="p-4 text-left truncate max-w-[120px] sm:max-w-none">{order.id}</td>
                <td className="p-4 text-left font-medium text-gray-900">${order.total}</td>
                <td className="p-4 text-left text-gray-700 truncate max-w-[150px] sm:max-w-none">{randomAddresses[index]}</td>
                <td className="p-4 text-left">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                      order.status === "Delivered"
                        ? "bg-green-200 text-green-700"
                        : order.status === "Pending"
                        ? "bg-orange-200 text-orange-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;