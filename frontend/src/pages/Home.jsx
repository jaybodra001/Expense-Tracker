import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";

const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedGraphType, setSelectedGraphType] = useState("Bar");

  // Data for charts
  const chartData = {
    daily: {
      labels: ["01 Jan", "02 Jan", "03 Jan", "04 Jan", "05 Jan", "06 Jan", "07 Jan"],
      datasets: [
        {
          label: "Income",
          data: [100, 200, 150, 300, 250, 400, 350],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "Expenses",
          data: [80, 180, 120, 250, 200, 350, 300],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
    weekly: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Income",
          data: [500, 700, 800, 600, 900, 1100, 1000],
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "Expenses",
          data: [400, 600, 500, 700, 800, 1000, 900],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
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
        },
        {
          label: "Expenses",
          data: [1800, 2200, 2600, 2400, 2900, 3000, 3200, 3100, 2900, 3000, 3500, 3700],
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    },
  };

  const totalIncome = 50000;
  const totalExpenses = 45000;

  // Render chart
  const renderChart = () => {
    const data = chartData[selectedPeriod];
    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { font: { size: 10 } } },
      },
      scales: {
        x: { ticks: { font: { size: 10 } } },
        y: { ticks: { font: { size: 10 } } },
      },
    };
    return selectedGraphType === "Line" ? (
      <Line data={data} options={options} height={150} />
    ) : (
      <Bar data={data} options={options} height={150} />
    );
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-300">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isVisible={isSidebarVisible} />
          <main className="flex-1 p-4 overflow-y-auto">
            <div className="w-full bg-white p-3 rounded-lg shadow-md">
              <h1 className="text-lg font-bold text-gray-800 mb-4">Expense Tracker</h1>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-green-100 p-3 rounded-lg shadow-sm">
                  <h2 className="text-sm font-semibold text-green-800">Total Income</h2>
                  <p className="text-lg font-bold text-green-600 mt-1">₹{totalIncome.toLocaleString()}</p>
                </div>
                <div className="bg-red-100 p-3 rounded-lg shadow-sm">
                  <h2 className="text-sm font-semibold text-red-800">Total Expenses</h2>
                  <p className="text-lg font-bold text-red-600 mt-1">₹{totalExpenses.toLocaleString()}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label htmlFor="period" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Period
                  </label>
                  <select
                    id="period"
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="daily">Day Wise</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="graphType" className="block text-sm font-medium text-gray-700 mb-1">
                    Select Graph Type
                  </label>
                  <select
                    id="graphType"
                    value={selectedGraphType}
                    onChange={(e) => setSelectedGraphType(e.target.value)}
                    className="block w-full p-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="Bar">Bar Chart</option>
                    <option value="Line">Line Graph</option>
                  </select>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <h2 className="text-md font-semibold text-gray-800 mb-2">
                  {selectedPeriod === "daily"
                    ? "Day Wise"
                    : selectedPeriod === "weekly"
                    ? "Weekly"
                    : "Monthly"}{" "}
                  {selectedGraphType}
                </h2>
                <div className="h-[22.2rem]">{renderChart()}</div>
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
      <Footer />
    </>
  );
};

export default Home;
