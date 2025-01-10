import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Bar, Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedGraphType, setSelectedGraphType] = useState("Bar");

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Data for weekly and monthly charts
  const chartData = {
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Income",
          data: [500, 700, 800, 600, 900, 1100, 1000],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          fill: true,
        },
        {
          label: "Expenses",
          data: [400, 600, 500, 700, 800, 1000, 900],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          fill: true,
        },
      ],
    },
    monthly: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Income",
          data: [2000, 2500, 3000, 2800, 3200, 3500, 4000, 3800, 3600, 3900, 4200, 4500],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          fill: true,
        },
        {
          label: "Expenses",
          data: [1800, 2200, 2600, 2400, 2900, 3000, 3200, 3100, 2900, 3000, 3500, 3700],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
          fill: true,
        },
      ],
    },
  };

  const totalIncome = 50000; // Replace with dynamic calculation
  const totalExpenses = 45000; // Replace with dynamic calculation

  // Function to render the selected chart type
  const renderChart = () => {
    const data = chartData[selectedPeriod];
    switch (selectedGraphType) {
      case "Line":
        return <Line data={data} />;
      default:
        return <Bar data={data} />;
    }
  };

  return (
    <>
    <div className="flex flex-col h-screen bg-gray-300">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isVisible={isSidebarVisible} />
        <main className="flex-1 p-4 overflow-y-auto">
          <div className="w-full bg-white p-6 rounded-lg shadow-md">
            {/* Dashboard */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Expense Tracker Dashboard</h1>

            {/* Total Income and Expenses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-green-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-green-800">Total Income</h2>
                <p className="text-3xl font-bold text-green-600 mt-4">₹{totalIncome.toLocaleString()}</p>
              </div>
              <div className="bg-red-100 p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-red-800">Total Expenses</h2>
                <p className="text-3xl font-bold text-red-600 mt-4">₹{totalExpenses.toLocaleString()}</p>
              </div>
            </div>

            {/* Dropdown to Select Period */}
            <div className="mb-6">
              <label htmlFor="period" className="block text-lg font-medium text-gray-700 mb-2">
                Select Period
              </label>
              <select
                id="period"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            {/* Dropdown to Select Graph Type */}
            <div className="mb-6">
              <label htmlFor="graphType" className="block text-lg font-medium text-gray-700 mb-2">
                Select Graph Type
              </label>
              <select
                id="graphType"
                value={selectedGraphType}
                onChange={(e) => setSelectedGraphType(e.target.value)}
                className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Bar">Bar Chart</option>
                <option value="Line">Line Graph</option>
              </select>
            </div>

            {/* Dynamic Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {selectedPeriod === "weekly" ? "Weekly" : "Monthly"} {selectedGraphType} of Income vs Expenses
              </h2>
              {renderChart()}
            </div>
          </div>
        </main>
      </div>
      <button
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full lg:hidden shadow-md"
      >
        Toggle Sidebar
      </button>
      
    </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
