  import axios from "axios";
  import toast from "react-hot-toast";
  import { create } from "zustand";

  export const useAuthStore = create((set) => ({
    user: null,
    isSigningUp: false,
    isCheckingAuth: true,
    isLoggingOut: false,
    isLoggingIn: false,
    expenses: [],
    isFetchingExpenses: false,
    isCreatingExpense: false,
    isUpdatingExpense: false,
    isDeletingExpense: false,

    signup: async (credentials) => {
      set({ isSigningUp: true });
      try {
        const response = await axios.post("/api/v1/auth/signup", credentials);
        set({ user: response.data.user, isSigningUp: false });
        toast.success("Account created successfully");
      } catch (error) {
        toast.error(error.response.data.message || "Signup failed");
        set({ isSigningUp: false, user: null });
      }
    },

    login: async (credentials) => {
      set({ isLoggingIn: true });
      try {
        const response = await axios.post("/api/v1/auth/login", credentials);
        set({ user: response.data.user, isLoggingIn: false });
        toast.success("Logged in successfully");
        return true;
      } catch (error) {
        set({ isLoggingIn: false, user: null });
        toast.error(error.response.data.message || "Login failed");
      }
    },

    logout: async () => {
      set({ isLoggingOut: true });
      try {
        await axios.post("/api/v1/auth/logout");
        set({ user: null, isLoggingOut: false });
        toast.success("Logged out successfully");
      } catch (error) {
        set({ isLoggingOut: false });
        toast.error(error.response.data.message || "Logout failed");
      }
    },

    authCheck: async () => {
      set({ isCheckingAuth: true });
      try {
        const response = await axios.get("/api/v1/auth/authCheck");
        set({ user: response.data.user, isCheckingAuth: false });
      } catch (error) {
        set({ isCheckingAuth: false, user: null });
      }
    },

  // Create Expense
  createExpense: async (expenseData) => {
    set({ isCreatingExpense: true });
    try {
      const response = await axios.post("/api/v1/auth/expenses", expenseData);
      set((state) => ({
        expenses: [...state.expenses, response.data.expense],
        isCreatingExpense: false,
      }));
      toast.success("Expense created successfully");
    } catch (error) {
      set({ isCreatingExpense: false });
      toast.error(error.response.data.message || "Failed to create expense");
    }
  },

  // Fetch Expenses
  fetchExpenses: async () => {
    set({ isFetchingExpenses: true });
    try {
      const response = await axios.get("/api/v1/auth/expenses");
      console.log("API Response:", response.data); // Log the response to check the data
      set({ expenses: response.data.expenses, isFetchingExpenses: false });
    } catch (error) {
      set({ isFetchingExpenses: false });
      toast.error(error.response?.data?.message || "Failed to fetch expenses");
    }
  },
  

  // Update Expense
  updateExpense: async (id, updatedData) => {
    set({ isUpdatingExpense: true });
    try {
      const response = await axios.put(`/api/v1/auth/expenses/${id}`, updatedData);
      set((state) => ({
        expenses: state.expenses.map((expense) =>
          expense._id === id ? response.data.expense : expense
        ),
        isUpdatingExpense: false,
      }));
      toast.success("Expense updated successfully");
    } catch (error) {
      set({ isUpdatingExpense: false });
      toast.error(error.response.data.message || "Failed to update expense");
    }
  },

  // Delete Expense
  deleteExpense: async (id) => {
    set({ isDeletingExpense: true });
    try {
      await axios.delete(`/api/v1/auth/expenses/${id}`);
      set((state) => ({
        expenses: state.expenses.filter((expense) => expense._id !== id),
        isDeletingExpense: false,
      }));
      toast.success("Expense deleted successfully");
    } catch (error) {
      set({ isDeletingExpense: false });
      toast.error(error.response.data.message || "Failed to delete expense");
    }
  },
  }));