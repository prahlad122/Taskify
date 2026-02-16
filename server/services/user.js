const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    console.log("Register request received:", req.body); // Debug log

    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (username.length < 5) {
      return res.status(400).json({ error: "Username must have 5 characters" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must have 6 characters" });
    }

    // Check if user exists
    console.log(" Checking if user exists...");
    const checkUsers = await User.findOne({ $or: [{ email }, { username }] });

    if (checkUsers) {
      return res.status(400).json({ error: "User already exists!" });
    }

    // Hash password
    console.log("Hashing password...");
    const hashPass = await bcrypt.hash(password, 10);

    // Create user
    console.log("Creating new user...");
    const newUser = new User({ username, email, password: hashPass });
    await newUser.save();

    console.log(" User created successfully:", newUser._id);
    return res.status(201).json({ success: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error.message);
    console.error("Stack:", error.stack);

    return res.status(500).json({
      error: "Internal server error!",
      message: error.message, // Add this to see actual error
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  login Validation

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      bcrypt.compare(password, checkUser.password, (err, data) => {
        if (data) {
          const token = jwt.sign(
            { id: checkUser._id, email: checkUser.email },
            process.env.JWT_SECRET,
            { expiresIn: "30d" },
          );
          res.cookie("taskifyUserToken", token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
          });
          return res.status(200).json({ success: "Login successful:" });
        } else {
          return res.status(400).json({ error: "invalid credentials:" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//logout ki api

const logout = async (req, res) => {
  try {
    res.clearCookie("taskifyUserToken", {
      httpOnly: true,
    });
    res.json({ message: "LoggedOut" });
  } catch (error) {
    return res.status(404).json({ error: "Internal server Error:" });
  }
};

const userDetails = async (req, res) => {
  try {
    const { user } = req;
    const getDetails = await User.findById(user._id)
      .populate("tasks")
      .select("-password");
    if (getDetails) {
      const allTasks = getDetails.tasks;
      let yetToStart = [];
      let inProgress = [];
      let completed = [];
      allTasks.map((item) => {
        if (item.status === "Yet To Start") {
          yetToStart.push(item);
        } else if (item.status === "inProgress") {
          inProgress.push(item);
        } else {
          completed.push(item);
        }
      });
      //console.log(getDetails);

      return res
        .status(200)
        .json({
          success: "success",
          tasks: [{ yetToStart }, { inProgress }, { completed }],
        });
    }
  } catch (error) {
    return res.status(404).json({ error: "Internal server Error" });
  }
};

module.exports = { register, login, logout, userDetails };
