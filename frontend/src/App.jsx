import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from './store/authUser';
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile";
import BorrowBook from "./pages/BorrowBook";
import ManageBook from "./pages/ManageBook";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Loader } from 'lucide-react'

// npm install chart.js react-chartjs-2  create chart

function App() {
  // const { user, isCheckingAuth, authCheck } = useAuthStore();

  // useEffect(() => {
  //   authCheck();
  // }, [authCheck]);

  // if (isCheckingAuth) {
	// 	return (
	// 		<div className='h-screen'>
	// 			<div className='flex justify-center items-center bg-black h-full'>
	// 				<Loader className='animate-spin text-blue-500 size-10' />
	// 			</div>
	// 		</div>
	// 	);
	// }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/profile/borrow" element={user ? <BorrowBook /> : <Navigate to="/login" />} />
        <Route path="/profile/manage-book" element={user && user.role === "admin" ? <ManageBook /> : <Navigate to="/login" />} /> */}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
