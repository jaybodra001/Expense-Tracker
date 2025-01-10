import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import { useAuthStore } from "../store/authUser";
import { format } from "date-fns";

const ExpenseList = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingExpense, setEditingExpense] = useState(null);

  const {
    expenses,
    fetchExpenses,
    deleteExpense,
    updateExpense,
    isFetchingExpenses,
  } = useAuthStore();

  useEffect(() => {
    fetchExpenses(); // Fetch expenses when component mounts
  }, [fetchExpenses]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    deleteExpense(id); // Call the delete API
  };

  const handleEdit = (expense) => {
    const formattedDate = new Date(expense.date).toISOString().split("T")[0]; // Converts to YYYY-MM-DD format
  setEditingExpense({ ...expense, date: formattedDate });
  };

  const handleUpdate = () => {
    updateExpense(editingExpense._id, editingExpense); // Call the update API
    setEditingExpense(null); // Exit edit mode after saving
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingExpense({ ...editingExpense, [name]: value });
  };

  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);
  const paginatedExpenses = filteredExpenses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-300">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar isVisible={isSidebarVisible} />
          <main className="flex-1 p-4 overflow-y-auto">
            <div className="w-full bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-xl font-bold text-gray-800 mb-4">
                Expense List
              </h1>

              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by title"
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Expense Table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border-b">Title</th>
                    <th className="p-2 border-b">Amount</th>
                    <th className="p-2 border-b">Date</th>
                    <th className="p-2 border-b">Type</th>
                    <th className="p-2 border-b">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isFetchingExpenses ? (
                    <tr>
                      <td colSpan="5" className="p-2 text-center">
                        Loading...
                      </td>
                    </tr>
                  ) : (
                    paginatedExpenses.map((expense) => (
                      <tr key={expense._id}>
                        <td className="p-2 border-b">
                          {editingExpense &&
                          editingExpense._id === expense._id ? (
                            <input
                              type="text"
                              name="title"
                              value={editingExpense.title}
                              onChange={handleChange}
                              className="w-full p-1 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            expense.title
                          )}
                        </td>
                        <td className="p-2 border-b">
                          {editingExpense &&
                          editingExpense._id === expense._id ? (
                            <input
                              type="number"
                              name="amount"
                              value={editingExpense.amount}
                              onChange={handleChange}
                              className="w-full p-1 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            expense.amount
                          )}
                        </td>
                        <td className="p-2 border-b">
                          {editingExpense &&
                          editingExpense._id === expense._id ? (
                            <input
                              type="date"
                              name="date"
                              value={editingExpense.date}
                              onChange={handleChange}
                              className="w-full p-1 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            format(new Date(expense.date), "yyyy-MM-dd") // Formats the date as YYYY-MM-DD
                          )}
                        </td>
                        <td className="p-2 border-b">
                          {editingExpense &&
                          editingExpense._id === expense._id ? (
                            <select
                              name="type"
                              value={editingExpense.type}
                              onChange={handleChange}
                              className="w-full p-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="Income">Income</option>
                              <option value="Expenses">Expenses</option>
                            </select>
                          ) : (
                            expense.type
                          )}
                        </td>
                        <td className="p-2 border-b">
                          {editingExpense &&
                          editingExpense._id === expense._id ? (
                            <button
                              onClick={handleUpdate}
                              className="text-green-500 hover:underline text-sm"
                            >
                              Update
                            </button>
                          ) : (
                            <>
                              <button
                                onClick={() => handleEdit(expense)}
                                className="text-blue-500 hover:underline text-sm mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(expense._id)}
                                className="text-red-500 hover:underline text-sm"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`p-2 text-sm rounded ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`p-2 text-sm rounded ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  Next
                </button>
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

export default ExpenseList;
