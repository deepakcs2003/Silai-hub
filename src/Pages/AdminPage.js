import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
export const AdminPage = () => {
  const [visitorCount, setVisitorCount] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    totalProducts: 100,
    pendingOrders: 20,
    completeOrders: 80,
    totalOrders: 100,
    newOrders: 5,
    totalRevenue: 50000, // in currency units
    todaysRevenue: 2000, // in currency units
  });
  
  // Increment visitor count when the page loads
  useEffect(() => {
    const storedCount = localStorage.getItem("visitorCount");
    const count = storedCount ? parseInt(storedCount, 10) : 0;

    const newCount = count + 1;
    localStorage.setItem("visitorCount", newCount);

    setVisitorCount(newCount);
  }, []);

  return (
    <div className="bg-deep-burgundy text-off-white p-4 flex flex-col sm:flex-row justify-between items-center shadow-md">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 flex flex-col sm:flex-row justify-between items-center shadow-md">
        <h1 className="text-fs-2 font-heading font-bold mb-2 sm:mb-0">
          Admin Dashboard
        </h1>
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 w-full sm:w-auto rounded-md text-deep-burgundy font-body focus:outline-none"
        />
      </header>

      {/* Product Management and Order Management Section */}
      <section className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-white shadow-md">
        {/* Product Management */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-fs-4 font-heading font-bold leading-tight tracking-tight mb-4">
            Product Management
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/product/null/add">
              <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">
                Add Product
              </button>
            </Link>
            <Link to="/view_product">
              <button className="bg-yellow-500 text-white font-body px-4 py-2 rounded-md hover:bg-yellow-600 transition">
                Update Product
              </button>
            </Link>
            <Link to="/view_product">
              <button className="bg-red-500 text-white font-body px-4 py-2 rounded-md hover:bg-red-600 transition">
                Delete Product
              </button>
            </Link>
            <Link to="/view_product">
              <button className="bg-orange-400 text-white font-body px-4 py-2 rounded-md hover:bg-red-600 transition">
                View Product
              </button>
            </Link>
          </div>
        </div>

        {/* Order Management */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-fs-4 font-heading font-bold mb-4">Order Management</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-yellow-500">
                Pending Orders
              </h3>
              <p className="text-2xl font-bold">{dashboardData.pendingOrders}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-green-500">
                Completed Orders
              </h3>
              <p className="text-2xl font-bold">{dashboardData.completeOrders}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-purple-500">
                Total Orders
              </h3>
              <p className="text-2xl font-bold">{dashboardData.totalOrders}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-pink-500">New Orders</h3>
              <p className="text-2xl font-bold">{dashboardData.newOrders}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Stats Section */}
      <section className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {[{ title: "Total Visitors", value: visitorCount, color: "text-red-500" },
          { title: "Total Products", value: dashboardData.totalProducts, color: "text-green-500" },
          { title: "Total Revenue", value: `₹${dashboardData.totalRevenue.toLocaleString()}`, color: "text-teal-500" },
          { title: "Today's Revenue", value: `₹${dashboardData.todaysRevenue.toLocaleString()}`, color: "text-orange-500" },
        ].map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform transition duration-300 hover:scale-105">
            <h2 className={`text-lg font-semibold ${card.color}`}>
              {card.title}
            </h2>
            <p className="text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
