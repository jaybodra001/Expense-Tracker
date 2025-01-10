import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import { useAuthStore } from "../store/authUser"; 
const Home = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");
  const [selectedGraphType, setSelectedGraphType] = useState("Bar");

  const [chartData, setChartData] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  const { fetchExpenses, expenses } = useAuthStore(); 

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  useEffect(() => {
    if (expenses.length > 0) {
      const income = expenses.reduce((sum, exp) => (exp.type === "Income" ? sum + exp.amount : sum), 0);
      const expensesTotal = expenses.reduce((sum, exp) => (exp.type === "Expenses" ? sum + exp.amount : sum), 0);
  
      setTotalIncome(income);
      setTotalExpenses(expensesTotal);
  
      const periodData = processChartData(expenses, selectedPeriod);
      console.log("Chart Data: ", periodData); 
      setChartData(periodData);
    }
  }, [expenses, selectedPeriod]);
  

  const processChartData = (data, period) => {
    const groupedData = groupDataByPeriod(data, period);
    console.log("Grouped Data for Chart:", groupedData); 
  
    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          label: "Income",
          data: Object.values(groupedData).map((item) => item.income),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
        },
        {
          label: "Expenses",
          data: Object.values(groupedData).map((item) => item.expenses),
          backgroundColor: "rgba(255, 99, 132, 0.6)",
          borderColor: "rgba(255, 99, 132, 1)",
        },
      ],
    };
  };

  const groupDataByPeriod = (data, period) => {
    const grouped = {};
    data.forEach((item) => {
      const date = new Date(item.date);
      let key;
  
      if (period === "daily") {
        key = date.toISOString().split("T")[0]; // YYYY-MM-DD
      } else if (period === "weekly") {
        const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
        key = week;
      } else if (period === "monthly") {
        key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`; // YYYY-MM
      }
  
      if (!grouped[key]) {
        grouped[key] = { income: 0, expenses: 0 };
      }
  
      if (item.type === "Income") {
        grouped[key].income += item.amount;
      } else if (item.type === "Expenses") {
        grouped[key].expenses += item.amount;
      }
    });
  
    return grouped;
  };
  

  // Render the selected chart type (Bar or Line)
  const renderChart = () => {
    if (!chartData) return <p>Loading chart...</p>;

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
      <Line data={chartData} options={options} height={150} />
    ) : (
      <Bar data={chartData} options={options} height={150} />
    );
  };

  // Toggle sidebar visibility
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
