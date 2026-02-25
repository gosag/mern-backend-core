import {z} from "zod";
import mongoose from "mongoose"
export const userBodySchema=z.object({
        userName:z
            .string()
            .trim()
            .min(3,"username should contain at least 3 letters"),
        password:z
            .string()
            .min(6,"password too short"),
        email:z
            .string()
            .trim()
            .toLowerCase()
            .email()
})
export const loginSchema=z.object({
    email:z.string().trim().email(),
    password:z.string()
})
export const userQuerySchema = z.object({
  source: z.string().optional(),
});
export const mongoIdSchema = z.object({
  id: z.string().refine(
    val => mongoose.Types.ObjectId.isValid(val),
    { message:"invalid MongoDB ObjectId"}
  ),
});