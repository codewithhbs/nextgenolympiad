import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  password: z.string().min(6),
  schoolName: z.string().min(2),
  city: z.string().optional(),
  state: z.string().optional(),
  address: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const otpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5),
});

export const studentSchema = z.object({
  name: z.string().min(2),
  studentCode: z.string().min(1),
  class: z.string().min(1),
  section: z.string().optional(),
  gender: z.enum(["male", "female", "other"]).optional(),
  dob: z.string().optional(),
  parentName: z.string().optional(),
  mobile: z.string().optional(),
  image: z.any().optional(),
});
