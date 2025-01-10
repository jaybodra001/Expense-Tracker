import express from 'express'
import { authCheck, signup, login,logout, createExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/auth.controller.js'
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router()


router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.get("/authCheck", protectRoute, authCheck)

router.post("/expenses", protectRoute, createExpense);
router.get("/expenses", protectRoute, getExpenses);
router.put("/expenses/:id", protectRoute, updateExpense);
router.delete("/expenses/:id", protectRoute, deleteExpense);

export default router;

