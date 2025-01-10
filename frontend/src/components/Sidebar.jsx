import React from "react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/authUser";

const Sidebar = ({ isVisible }) => {
  const { logout, user } = useAuthStore();
  return (
    <aside
      className={` text-black w-64 p-4 space-y-4 bg-white rounded-lg m-4 ${
        isVisible ? "block" : "hidden"
      } lg:block`}
    >
      <NavLink
        to="/"
        className="block p-2 rounded hover:bg-blue-800 hover:text-white transition"
      >
        Dashboard
      </NavLink>
        <NavLink
        to="/form"
        className="block p-2 rounded hover:bg-blue-800 hover:text-white transition"
      >
        Expense Form
      </NavLink>
      <NavLink
        to="/list"
        className="block p-2 rounded hover:bg-blue-800 hover:text-white transition"
      >
         Expense List
      </NavLink>
      
      <a
        className="block p-2 rounded cursor-pointer hover:bg-blue-800 hover:text-white transition"
        onClick={logout} 
      >
        Logout
      </a>
    </aside>
  );
};

export default Sidebar;
