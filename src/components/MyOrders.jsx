// import { useState, useEffect } from "react";

// const MyOrders = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     // Fetch orders from localStorage
//     const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
//     setOrders(storedOrders);
//   }, []);

//  return (
//     <div className="p-4">
//       <h2 className="text-3xl font-bold mb-4">My Orders</h2>
//       <div className="overflow-x-auto">
//         <table className="w-full text-left">
//           <thead>
//             <tr className="bg-gray-200 text-gray-800">
//               <th className="p-3">Order ID</th>
//               <th className="p-3">Total</th>
//               <th className="p-3">Status</th>
//            </tr>
//           </thead>
//           <tbody>
//             {orders.map((order, index) => (
//               <tr
//                 key={order.id}
//                 className={`${
//                   index % 2 === 0 ? "bg-gray-100" : "bg-white"
//                 }`}
//               >
//                 <td className="p-3">{order.id}</td>
//                 <td className="p-3">${order.total}</td>
//                 <td className="p-3 text-yellow-500">{order.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MyOrders;

import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  const handleDelete = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleEdit = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: "Delivered" } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-4">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-800 text-center">
              <th className="p-3 w-1/4 text-center">Order ID</th>
              <th className="p-3 w-1/4 text-center">Total</th>
              <th className="p-3 w-1/4 text-center">Status</th>
              <th className="p-3 w-1/4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`border-b last:border-0 ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-3 text-center">{order.id}</td>
                <td className="p-3 font-medium text-center">${order.total}</td>
                <td className="p-3 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === "Delivered"
                        ? "bg-green-200 text-green-700"
                        : order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-700"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="p-2 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(order.id)}
                    className="p-2 bg-red-400 text-white rounded-md hover:bg-red-500"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
