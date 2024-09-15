import { z } from "zod";

export const logInSchema = z.object({
  email: z.string().email({
    message: "This is not valid email",
  }),
  password: z.string().min(6),
  code: z.optional(z.string()),
});

export const resetSchema = z.object({
  email: z.string().email({
    message: "This email is invalid",
  }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "minimum of 6 characters required",
  }),
});

export const signUpSchema = z.object({
  email: z.string().email({
    message: "This email is invalid",
  }),
  password: z.string().min(6, {
    message: "minimum of 6 characters required",
  }),
  name: z.string().min(1, {
    message: "name is required",
  }),
});

const fileSchema = z.instanceof(File, { message: "Required" });

export const imageSchema = fileSchema.refine(
  (file) => file.size === 0 || file.type.startsWith("image/")
);

export const addProductSchema = z.object({
  category: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  priceInCents: z.coerce.number().int().min(1),
  quantityInStock: z.coerce.number().int().min(1),
  offer: z.coerce.number().int().min(0).max(70),
  image: imageSchema.refine((file) => file.size > 0, "Required"),
});

export const contactSchema = z.object({
  email: z.string().email({
    message: "This email is invalid",
  }),
  subject: z.string().min(10, {
    message: "minimum of 10 characters required",
  }),
});

export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.string(),
  })
  .refine(
    (data) => {
      return data.password && !data.newPassword ? false : true;
    },
    {
      message: "New Password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      return !data.password && data.newPassword ? false : true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );
