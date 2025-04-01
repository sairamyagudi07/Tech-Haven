import { useState } from "react";
import MyOrders from "../components/MyOrders";

const UserDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("orders");

  return (
    <div className="p-4 sm:p-6 md:p-4">
      {/* Tabs for navigation */}
      <div className="flex flex-wrap justify-start space-x-4 mb-6">
        {/* <button
          className={`px-4 py-2 font-semibold ${
            selectedTab === "orders" ? "bg-yellow-500 text-white" : "text-gray-700"
          } rounded-md hover:bg-yellow-400 transition-colors`}
          onClick={() => setSelectedTab("orders")}
        >
          Orders
        </button> */}
        {/* <button
          className={`px-4 py-2 font-semibold ${
            selectedTab === "profile" ? "bg-yellow-500 text-white" : "text-gray-700"
          } rounded-md hover:bg-yellow-400 transition-colors`}
          onClick={() => setSelectedTab("profile")}
        >
          Profile
        </button> */}
      </div>

      {/* Show MyOrders when "orders" tab is active */}
      {selectedTab === "orders" && <MyOrders />}

      {/* Show Profile section if implemented
      {selectedTab === "profile" && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold">Profile Section</h3>
          <p className="text-gray-600">Profile details will be here (To be implemented).</p>
        </div>
      )} */}
    </div>
  );
};

export default UserDashboard;
