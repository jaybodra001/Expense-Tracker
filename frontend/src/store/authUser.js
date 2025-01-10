import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,
  books: [],
  isFetchingBooks: false, 
  isBorrowing: false,
  isReturning: false,
  isCreatingBook: false,
  isUpdatingBook: false,
  isDeletingBook: false,

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

  fetchBooks: async () => {
    set({ isFetchingBooks: true });
    try {
      const response = await axios.get("/api/v1/auth/book");
      set({ books: response.data.books, isFetchingBooks: false });
    } catch (error) {
      set({ isFetchingBooks: false });
      toast.error(error.response.data.message || "Failed to fetch books");
    }
  },

  createBook: async (bookData) => {
    set({ isCreatingBook: true });
    try {
      const response = await axios.post("/api/v1/auth/book", bookData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Book created successfully!");
      set((state) => ({
        books: [...state.books, response.data.book],
        isCreatingBook: false,
      }));
    } catch (error) {
      set({ isCreatingBook: false });
      toast.error(error.response?.data?.message || "Failed to create the book");
    }
  },

  updateBook: async (bookId, updatedData) => {
    set({ isUpdatingBook: true });
    try {
      const response = await axios.put(`/api/v1/auth/book/${bookId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Book updated successfully!");
      set((state) => ({
        books: state.books.map((book) =>
          book._id === bookId ? { ...book, ...updatedData } : book
        ),
        isUpdatingBook: false,
      }));
    } catch (error) {
      set({ isUpdatingBook: false });
      toast.error(error.response?.data?.message || "Failed to update the book");
    }
  },

  deleteBook: async (bookId) => {
    set({ isDeletingBook: true });
    try {
      await axios.delete(`/api/v1/auth/book/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Book deleted successfully!");
      set((state) => ({
        books: state.books.filter((book) => book._id !== bookId),
        isDeletingBook: false,
      }));
    } catch (error) {
      set({ isDeletingBook: false });
      toast.error(error.response?.data?.message || "Failed to delete the book");
    }
  },

  borrowBook: async (bookId) => {
    set({ isBorrowing: true });
    try {
      const response = await axios.post(
        `/api/v1/auth/book/${bookId}/borrow`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Book borrowed successfully!");
      set((state) => ({
        books: state.books.map((book) =>
          book._id === bookId ? { ...book, isBorrowed: true, borrowedBy: state.user.id } : book
        ),
        isBorrowing: false,
      }));
    } catch (error) {
      set({ isBorrowing: false });
      toast.error(error.response?.data?.message || "Failed to borrow the book");
    }
  },

  returnBook: async (bookId) => {
    set({ isReturning: true });
    try {
      const response = await axios.post(
        `/api/v1/auth/book/${bookId}/return`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Book returned successfully!");
      set((state) => ({
        books: state.books.map((book) =>
          book._id === bookId ? { ...book, isBorrowed: false, borrowedBy: null } : book
        ),
        isReturning: false,
      }));
    } catch (error) {
      set({ isReturning: false });
      toast.error(error.response?.data?.message || "Failed to return the book");
    }
  },

  // Get books borrowed by the logged-in user
  getUserBorrowedBooks: () => {
    return (state) => state.books.filter((book) => book.isBorrowed && book.borrowedBy === state.user.id);
  },
}));
