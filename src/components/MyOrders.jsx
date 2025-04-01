import { useState, useEffect } from "react";
import { Products } from "../data/Products";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="min-h-screen object-contain">
      {/* <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 sm:mb-8 text-center md:text-left">
        My Orders
      </h2> */}
      <div className="space-y-4 sm:space-y-6">
        {orders.length === 0 ? (
          <p className="text-gray-600 text-sm sm:text-base text-center py-8">
            No orders found.
          </p>
        ) : (
          orders.map((order) => {
            const product = Products.find((p) => p.id === order.productId);
            return (
              <div
                key={order.id}
                className="bg-white shadow-md hover:shadow-lg rounded-lg p-4 sm:p-6 transition-shadow duration-300"
              >
                {/* Status & Date */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-0">
                  <span className="bg-yellow-200 text-yellow-700 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold flex items-center gap-2 w-fit">
                    <span className="w-2 h-2 bg-yellow-700 rounded-full"></span>
                    Pending
                  </span>
                  <span className="hidden sm:block h-5 w-px bg-gray-400"></span>
                  <span className="text-gray-500 text-xs sm:text-sm font-semibold">
                    {order.date}
                  </span>
                </div>

                {/* Image & Content Wrapper */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Product Image */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                    <img
                      src={product?.image || "default-image.jpg"}
                      alt={product?.name || "Product Image"}
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>

                  {/* Order Content */}
                  <div className="flex-1">
                    <h3 className="text-red-600 font-bold text-sm sm:text-base md:text-lg">
                      Order ID: {order.id}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base mt-1">
                      {product?.name || "Product Name"}
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-semibold mt-1">
                      ${order.total}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyOrders;

