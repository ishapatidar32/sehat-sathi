import { verifyAccessToken } from "../utils/jwt.util.js";

// Confirms the request carries a valid access token, attaches { id, role } to req.user
export function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    req.user = verifyAccessToken(token); // { id, role, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

// Use after authenticate() to restrict a route to one role, e.g. requireRole("doctor")
export function requireRole(role) {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: "Access denied for this role" });
    }
    next();
  };
}