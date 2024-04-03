import { z } from "zod";

export const userSignupInput = z.object({
  name: z.string().max(20).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const userSigninInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type UserSignupInput = z.infer<typeof userSignupInput>;
export type UserSigninInput = z.infer<typeof userSigninInput>;
