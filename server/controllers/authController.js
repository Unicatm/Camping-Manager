const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const match = await bcrypt.compare(password, user.password);

  if (!user || !match) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  if (match) {
    const role = user.role;

    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    user.refreshToken = refreshToken;
    const result = await user.save();
    console.log(result);
    console.log(role);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ role, accessToken });
  } else {
    res.sendStatus(401);
  }
};

exports.refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken });
  } catch (err) {
    res.sendStatus(403);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};
