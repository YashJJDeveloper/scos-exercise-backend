// import jwt from "jsonwebtoken";
// import * as s from "./auth.service.js";
// import { validateLogin } from "./auth.validator.js";
// export const login = async (req, res) => {
//     try {
//         console.log("BODY:", req.body);
//       const { email, password } = req.body;
//         validateLogin({email,password});
//       const user = await s.getUserByEmail(email);
//       console.log("USER:", user);
//       if (!user) {
//         return res.status(401).json({ message: "User not found" });
//       }
  
//       // TEMP (no bcrypt yet)
//       if (user.password_hash !== password) {
//         return res.status(401).json({ message: "Invalid password" });
//       }
  
//       res.json({
//         userId: user.id,
//         email: user.email,
//         username: user.full_name
//       });
  
//     } catch (err) {
//         console.error("LOGIN ERROR:", err);
//       res.status(500).json({ error: "Server error" });
//     }
//   };


  import * as s from "./auth.service.js";
import { validateLogin } from "./auth.validator.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { email, password } = req.body;

    validateLogin({ email, password });

    const user = await s.getUserByEmail(email);

    console.log("USER:", user);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // TEMP (no bcrypt yet)
    if (user.password_hash !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 🔐 GENERATE JWT TOKEN
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      "MY_SECRET_KEY", // ⚠️ later move to .env
      { expiresIn: "1d" }
    );

    // ✅ SEND TOKEN
    res.json({
      token,
      userId: user.id,
      email: user.email,
      username: user.full_name,
    });

  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ error: "Server error" });
  }
};