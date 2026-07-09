import main from "../../../database/conn";
import User from "../../../models/userSchema";
import generateToken from "../../../utils/generateToken";

export default async function login(req, res) {
  await main();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  try {
    /* =========================
       VALIDATION
    ========================= */
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    /* =========================
       FIND USER (CASE SAFE)
    ========================= */
    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        error: "User not found",
      });
    }

    /* =========================
       GOOGLE USER CHECK
    ========================= */
    if (!user.password) {
      return res.status(401).json({
        error: "Please login with Google",
      });
    }

    /* =========================
       PASSWORD CHECK (SMART)
    ========================= */
    let isMatch = false;

    // If password is hashed
    if (user.password.startsWith("$2")) {
      isMatch = await user.matchPassword(password);
    } else {
      // Old plain password समर्थन
      isMatch = password === user.password;

      // 🔥 Upgrade to hashed password automatically
      if (isMatch) {
        user.password = password;
        await user.save(); // pre-save hook will hash it
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentials",
      });
    }

    /* =========================
       SUCCESS RESPONSE
    ========================= */
    return res.status(200).json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
}