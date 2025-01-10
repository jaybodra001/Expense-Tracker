import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const ExpenseForm = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    type: "Income",
  });

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Reset the form
    setFormData({
      title: "",
      amount: "",
      date: "",
      type: "Income",
    });
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-300">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isVisible={isSidebarVisible} />
          <main className="flex-1 p-8 overflow-y-auto">
            <div className="w-full max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-xl">
              <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                Add Expense or Income
              </h1>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter title"
                    className="w-full p-4 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>

                {/* Amount */}
                <div>
                  <label
                    htmlFor="amount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter amount"
                    className="w-full p-4 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  />
                </div>

                {/* Type */}
                <div>
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full p-4 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  >
                    <option value="Income">Income</option>
                    <option value="Expenses">Expenses</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-4 rounded-xl text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
                  >
                    Add Entry
                  </button>
                </div>
              </form>
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

export default ExpenseForm;
