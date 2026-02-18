import {z} from "zod";
export const userBodySchema=z.object({
    body:z.object({
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
    }),
})
export const userQueryschema=z.object({
    source:z.string().optional()
})