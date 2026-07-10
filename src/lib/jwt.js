import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const signAccessToken = (payload) =>
  jwt.sign(payload, ACCESS_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES || "15m" });

export const signRefreshToken = (payload) =>
  jwt.sign(payload, REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES || "7d" });

export const verifyAccessToken = (token) => jwt.verify(token, ACCESS_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, REFRESH_SECRET);
