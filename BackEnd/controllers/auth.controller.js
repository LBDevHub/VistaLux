import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

export const signup = async (req, res, next) => {
  const { username, email, password, phonenumber, countryCode } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const fullPhoneNumber = `${countryCode}${phonenumber}`;

  const newUser = new User({ 
    username, 
    email, 
    password: hashedPassword, 
    phonenumber: fullPhoneNumber 
  });

  try {
    await newUser.save();
    res.status(201).json("User created successfully!");
  } catch (error) {
    next(error);
  }
};
