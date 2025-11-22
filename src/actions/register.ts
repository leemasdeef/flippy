"use server";

import { RegisterSchema } from "../../schemas";

import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { user } from "@/db/schema";
import * as z from "zod";
import { auth } from "@/server/auth";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;

  // check if user already exists

  const existing = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  if (existing) {
    return { error: "Email already exists." };
  }

  // insert user

  await auth.api.signUpEmail({
    body: {
      email,
      password,
      name,
    },
  });

  return { success: "Account was created successfully. Redirecting..." };
};
