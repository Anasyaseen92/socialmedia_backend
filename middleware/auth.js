import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next(); // ✅ This is the key! Allows request to continue
  } catch (error) {
    console.error("❌ Token verification failed:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
