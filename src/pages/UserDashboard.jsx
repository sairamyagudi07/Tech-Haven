import { useState } from "react";
import MyOrders from "../components/MyOrders";

const UserDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("orders");

  return (
    <div className="p-6">
      {/* Tabs for navigation */}
      <div className="flex space-x-4 mb-6"></div>

      {/* Show MyOrders when "orders" tab is active */}
      {selectedTab === "orders" && <MyOrders />}

      {/* Show Profile section if implemented */}
      {selectedTab === "profile" && (
        <div>Profile Section (To be implemented)</div>
      )}
    </div>
  );
};

export default UserDashboard;
