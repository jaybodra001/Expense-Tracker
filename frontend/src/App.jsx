import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";  
import { Toaster } from "react-hot-toast";
import ExpenseForm from "./pages/ExpenseForm";
import ExpenseList from "./pages/ExpenseList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuthStore } from "./store/authUser";
import { useEffect } from "react";
import { Loader } from "lucide-react";

// npm install chart.js react-chartjs-2  <---create chart

function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
		return (
			<div className='h-screen'>
				<div className='flex justify-center items-center bg-black h-full'>
					<Loader className='animate-spin text-blue-500 size-10' />
				</div>
			</div>
		);
	}

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/form" element={user ? <ExpenseForm /> : <Navigate to="/login" />} />
        <Route path="/list" element={user ? <ExpenseList /> : <Navigate to="/login" />}/>
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
