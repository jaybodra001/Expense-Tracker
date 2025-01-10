import React from "react";
import { useAuthStore } from "../store/authUser";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  return (
    <nav className="flex justify-between items-center px-6 py-2 bg-white shadow-xl">
      {/* Logo */}
      <div className="text-2xl font-bold text-gray-800">
        <img
          src="https://www.expenseout.com/wp-content/uploads/2021/03/Expense-logo_001.png"
          width={200}
          alt="Expense Tracker Logo"
        />
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        {!user ? (
          <a href="/login" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition">
            Login
          </a>
        ) : (
          <>
            <a href="/profile" className="text-gray-800">
              Profile
            </a>
            <button
              onClick={logout} // Replace with actual logout logic
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
