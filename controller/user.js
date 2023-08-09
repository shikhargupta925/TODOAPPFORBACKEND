import { User } from "../models/user.js";
import { sendCookie } from "../utils/features.js";
import bcrypt from "bcrypt";

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { 
        expires: new Date(Date.now()) ,
        sameSite:process.env.NODE_ENV==="Development"?"lax": "none",
        secure:process.env.NODE_ENV==="Development"?false: true,
    })
      .json({
        success: true,
      });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return next(new ErrorHandler("Invalid username or password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid username or password", 404));
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  let user = await User.findOne({ email });

  if (user) return next(new ErrorHandler("User Already Exist", 400));

  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });
  sendCookie(user, res, "Registered Successfully", 201);
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};
