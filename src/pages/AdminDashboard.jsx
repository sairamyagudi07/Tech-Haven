import React from "react";
import { FaUsers, FaShoppingCart, FaBox, FaTimesCircle } from "react-icons/fa";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "12,500",
      icon: <FaUsers />,
      color: "text-yellow-500",
    },
    {
      title: "Total Orders",
      value: "11,700",
      icon: <FaShoppingCart />,
      color: "text-yellow-500",
    },
    {
      title: "Total Products",
      value: "13,850",
      icon: <FaBox />,
      color: "text-yellow-500",
    },
    {
      title: "Cancelled Orders",
      value: "580",
      icon: <FaTimesCircle />,
      color: "text-yellow-500",
    },
  ];

  const usersData = [
    { name: "Jan", users: 250, newUsers: 150 },
    { name: "Feb", users: 500, newUsers: 300 },
    { name: "Mar", users: 400, newUsers: 250 },
    { name: "Apr", users: 800, newUsers: 500 },
    { name: "May", users: 1000, newUsers: 700 },
  ];

  const ordersData = [
    { name: "Jan", orders: 300 },
    { name: "Feb", orders: 750 },
    { name: "Mar", orders: 600 },
    { name: "Apr", orders: 900 },
    { name: "May", orders: 1200 },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6 mt-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
          >
            <div className={`${stat.color} text-3xl`}>{stat.icon}</div>
            <div>
              <p className="text-gray-600 text-sm">{stat.title}</p>
              <p className="text-xl font-semibold text-gray-800">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Total Users
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={usersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#FFD700"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="newUsers"
                stroke="#888"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Total Orders
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="orders" fill="#FFD700" barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
