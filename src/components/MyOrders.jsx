import { useState, useEffect } from "react";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="min-h-screen object-contain">
      <div className="space-y-4 sm:space-y-6">
        {orders.length === 0 ? (
          <p className="text-gray-600 text-sm sm:text-base text-center py-8">
            No orders found.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 sm:p-6 transition-shadow duration-300"
            >
              {/* Status & Date */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
                <span className="bg-yellow-200 text-yellow-700 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-2 w-fit">
                  <span className="w-2 h-2 bg-yellow-700 rounded-full"></span>
                  {order.status || "Pending"}
                </span>
                <span className="hidden sm:block h-5 w-px bg-gray-400"></span>
                <span className="text-gray-500 text-xs sm:text-sm font-semibold">
                  {new Date(order.date).toLocaleDateString()}
                </span>
              </div>

              {/* Order Items */}
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  {/* Product Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                    <img
                      src={item.image || "default-image.jpg"}
                      alt={item.name || "Product Image"}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>

                  {/* Order Content */}
                  <div className="flex-1">
                    <h3 className="text-red-600 font-bold text-sm sm:text-base md:text-lg">
                      Order ID: {order.id}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base mt-1">
                      {item.name || "Product Name"}
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-semibold mt-1">
                      ${item.price}
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base mt-1">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
