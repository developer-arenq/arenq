import jwt from "jsonwebtoken";

const generateToken = (
  user,
  options = { expiresIn: "7d" }
) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin || false,
      tokenVersion: user.tokenVersion || 0, // future safety
    },
    process.env.JWT_SECRET,
    options
  );
};

export default generateToken;
