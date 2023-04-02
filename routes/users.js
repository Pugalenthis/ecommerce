import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
const router = express.Router();
import jwt from "jsonwebtoken";

import { check, validationResult } from "express-validator";
import { createError } from "../utils/error.js";
import {
  verifyToken,
  verifyUser,
  verifyAdmin,
} from "../middlewares/authMiddleware.js";
// import nodemailer from "nodemailer";
// import Handlebars from "handlebars";
import fs from "fs";

// @route   POST api/user/register
// @desc    register user
// @access  public

router.post(
  "/register",
  check("name", "Name is required").notEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check(
    "password",
    "Please enter a password with 6 or more characters"
  ).isLength({ min: 6 }),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(500, { errors: errors.array() }));
    }

    try {
      // check user exists
      let alreadyUser = await User.findOne({ email: req.body.email });
      if (alreadyUser) {
        return next(createError(400, { message: "User already exists" }));
      }

      //hash password
      var salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(req.body.password, salt);

      var user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
      });
      await user.save();

      const payload = {
        id: user.id,
        isAdmin: user.isAdmin,
      };

      // generate and return jwt
      jwt.sign(payload, "jwtstring", (err, token) => {
        if (err) throw err;
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({
            token,
            email: user.email,
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
          });
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   POST api/user/login
// @desc    login route
// @access  public

router.post(
  "/login",

  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(createError(500, { errors: errors.array() }));
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return next(
          createError(400, { errors: [{ message: "Invalid Credentials" }] })
        );
      }

      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch)
        return next(
          createError(400, { errors: [{ message: "Invalid Credentials" }] })
        );
      const payload = {
        id: user.id,
        isAdmin: user.isAdmin,
      };

      // generate and return jwt
      jwt.sign(payload, "jwtstring", (err, token) => {
        if (err) throw err;
        res
          .cookie("access_token", token, {
            httpOnly: true,
          })
          .status(200)
          .json({
            token,
            name: user.name,
            _id: user._id,
            email: user.email,
            isAdmin: user.isAdmin,
          });
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

router.get("/user", verifyToken, async (req, res, next) => {
  try {
    const user = await User.find({
      _id: req.query.user_id || req.user.id,
    }).select("-password");
    console.log("user", user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.put("/:user_id", verifyToken, verifyUser, async (req, res, next) => {
  try {
    if (req.body.password) {
      //hash password
      var salt = bcrypt.genSaltSync(10);
      var hashedPassword = bcrypt.hashSync(req.body.password, salt);
      req.body.password = hashedPassword;
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.user_id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// router.post("/forgot-password/:email", async (req, res, next) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.AUTH_EMAIL,
//         pass: process.env.AUTH_PASS,
//       },
//     });

//     var readHTMLFile = function (path, callback) {
//       fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
//         if (err) {
//           callback(err);
//         } else {
//           callback(null, html);
//         }
//       });
//     };

//     readHTMLFile("api/user/routes/forgot-password.html", function (err, html) {
//       if (err) {
//         console.log("error reading file", err);
//         return;
//       }
//       var template = Handlebars.compile(html);
//       var replacements = {
//         email: req.params.email,
//         urlLink: `http://localhost:3000/reset-password/${req.params.email}`,
//       };
//       var htmlToSend = template(replacements);
//       var mailConfigurations = {
//         from: process.env.AUTH_EMAIL,
//         to: req.params.email,
//         subject: "Reset Password Link",
//         html: htmlToSend,
//       };
//       transporter.sendMail(mailConfigurations, function (error, info) {
//         if (error) throw Error(error);
//         console.log("Email Sent Successfully");
//         console.log(info);
//       });
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.put("/reset-password", async (req, res, next) => {
//   try {
//     //hash password
//     var salt = bcrypt.genSaltSync(10);
//     var hashedPassword = bcrypt.hashSync(req.body.password, salt);
//     const user = await User.findOneAndUpdate(
//       { email: req.body.email },
//       {
//         $set: { password: hashedPassword },
//       }
//     );
//     res.status(200).json("password reset successfully");
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
