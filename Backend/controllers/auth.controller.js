import { User } from "../models/user.model.js";
import { Expense } from "../models/expense.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

// User Signup
export async function signup(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,})$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email address!" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be at least 6 characters!" });
    }

    const existingUserByEmail = await User.findOne({ email: email });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists!" });
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
    });

    generateTokenAndSetCookie(newUser._id, res);

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (e) {
    console.log("Error in SignUp controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
}

// User Login
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const existingUserByEmail = await User.findOne({ email: email });
    if (!existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email does not exist!" });
    }
    const isValidPassword = await bcryptjs.compare(
      password,
      existingUserByEmail.password
    );
    if (!isValidPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password!" });
    }
    generateTokenAndSetCookie(existingUserByEmail._id, res);

    res.status(200).json({ success: true, message: "Login successful!" });
  } catch (e) {
    console.log("Error in Login controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
}

//user auth..
export async function authCheck(req, res) {
  try {
    console.log("req.user:", req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// User Logout
export async function logout(req, res) {
  try {
    res.clearCookie("jwt-expense");
    res
      .status(200)
      .json({ success: true, message: "Logged out successfully!" });
  } catch (e) {
    console.log("Error in Logout controller:" + e.message);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!" });
  }
}

// Create Expense
export async function createExpense(req, res) {
  try {
    const { title, amount, date, type } = req.body;
    const userId = req.user._id;

    if (!title || !amount || !date || !type) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!" });
    }

    if (!["Income", "Expenses"].includes(type)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid expense type!" });
    }

    const newExpense = new Expense({
      title,
      amount,
      date,
      type,
      user: userId,
    });

    await newExpense.save();

    res
      .status(201)
      .json({ success: true, message: "Expense created successfully!", expense: newExpense });
  } catch (e) {
    console.log("Error in createExpense controller:", e.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

// Fetch All Expenses for a User
export async function getExpenses(req, res) {
  try {
    console.log("User ID:", req.user._id); // Log the user ID
    const userId = req.user._id;

    const expenses = await Expense.find({ user: userId });

    if (!expenses || expenses.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No expenses found!" });
    }

    res.status(200).json({ success: true, expenses });
  } catch (e) {
    console.log("Error in getExpenses controller:", e.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}


// Update Expense
export async function updateExpense(req, res) {
  try {
    const { id } = req.params;
    const { title, amount, date, type } = req.body;
    const userId = req.user._id;

    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found!" });
    }

    expense.title = title || expense.title;
    expense.amount = amount || expense.amount;
    expense.date = date || expense.date;
    expense.type = type || expense.type;

    await expense.save();

    res
      .status(200)
      .json({ success: true, message: "Expense updated successfully!", expense });
  } catch (e) {
    console.log("Error in updateExpense controller:", e.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

// Delete Expense
export async function deleteExpense(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const expense = await Expense.findOne({ _id: id, user: userId });

    if (!expense) {
      return res.status(404).json({ success: false, message: "Expense not found!" });
    }

    await expense.deleteOne();

    res
      .status(200)
      .json({ success: true, message: "Expense deleted successfully!" });
  } catch (e) {
    console.log("Error in deleteExpense controller:", e.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}