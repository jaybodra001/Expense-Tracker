import "./index.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";  
import { Toaster } from "react-hot-toast";
import ExpenseForm from "./pages/ExpenseForm";
import ExpenseList from "./pages/ExpenseList";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/form" element={<ExpenseForm />} />
        <Route path="/list" element={<ExpenseList />}/>
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
