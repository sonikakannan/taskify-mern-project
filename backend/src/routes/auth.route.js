import express from 'express'
import { forgotPassword, getUser, getUserProfile, login, logout, register, resetPassword, updateUserProfile, verifyOTP } from '../controllers/auth.controller.js'
import { isAuthenticated } from '../middleware/auth.js'
import upload from '../middleware/upload.js'

const router = express.Router()

router.post("/register", register)
router.post("/otp-verification", verifyOTP)
router.post("/login", login)
router.get("/profile", isAuthenticated,getUserProfile )
router.put("/profile", isAuthenticated, updateUserProfile)
router.get("/logout", isAuthenticated,logout)
router.get("/me", isAuthenticated, getUser)
router.post("/password/forgot", forgotPassword)
router.put("/password/reset/:token", resetPassword);

router.post("/upload-image", upload.single("image"), (req, res)=>{
    if(!req.file){
        return res.status(400).json({ message: "No file uploaded"})
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`

    res.status(200).json({imageUrl})
})


export default router