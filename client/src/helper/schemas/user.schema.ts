import z, { email } from "zod";

export const signupSchema=z.object({
    name:z.string().min(3,"Name must be atleast 2 charecter"),
    email:z.string().email("Invailed email"),
    password:z.string().min(6,"Password Must 6-20 digit long").max(20,"Password Must 6-20 digit long")
})
export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string()
})
export type sigupType = z.infer<typeof signupSchema>;
export type loginType = z.infer<typeof loginSchema>;