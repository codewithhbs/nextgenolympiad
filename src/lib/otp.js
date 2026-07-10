import crypto from "crypto";
export const genOtp = () => String(crypto.randomInt(100000, 999999));
export const genToken = () => crypto.randomBytes(32).toString("hex");
