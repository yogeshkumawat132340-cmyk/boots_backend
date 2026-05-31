const express = require("express");
const router = express.Router();

const User = require("../models/User"); 

/* ==========================================================================
   📥 1. POST: Create User (डेटा सेव करने के लिए - आपका पुराना कोड)
   ========================================================================== */
router.post("/user", (req, res) => {
  const user = new User(req.body);

  user.save()
    .then((savedUser) => {
      res.status(201).json({
        success: true,
        message: "Data saved in MongoDB",
        data: savedUser
      });
    })
    .catch((err) => {
      res.status(500).json({ 
        success: false,
        error: err.message 
      });
    });
});

/* ==========================================================================
   📤 2. GET: Fetch All Users (सभी कस्टमर्स का डेटा फ्रंटएंड पर दिखाने के लिए)
   ========================================================================== */
router.get("/user", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        success: true,
        message: "All users fetched successfully",
        data: users // 👈 फ्रंटएंड पर यही 'data' टेबल में रेंडर होगा
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err.message
      });
    });
});

/* ==========================================================================
   📝 3. PUT: Edit/Update User (डेटा मॉडिफाई/अपडेट करने के लिए)
   ========================================================================== */
router.put("/user/:id", (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  // { new: true } लगाने से यह हमेशा अपडेटेड डेटा रिस्पॉन्स में भेजता है
  User.findByIdAndUpdate(userId, updatedData, { new: true })
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "Data Updated Successfully",
        data: updatedUser
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err.message
      });
    });
});

/* ==========================================================================
   ❌ 4. DELETE: Remove User (डेटाबेस से कस्टमर डिलीट करने के लिए)
   ========================================================================== */
router.delete("/user/:id", (req, res) => {
  const userId = req.params.id;

  User.findByIdAndDelete(userId)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      res.status(200).json({
        success: true,
        message: "Customer Record Deleted"
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err.message
      });
    });
});

/* ==========================================================================
   🔑 5. POST: Login User (आपका पुराना कोड)
   ========================================================================== */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.json({
      success: false,
      message: "User not found"
    });
  }

  if (user.password !== password) {
    return res.json({
      success: false,
      message: "Wrong password"
    });
  }

  res.json({
    success: true,
    message: "Login successful",
    user
  });
});

module.exports = router;