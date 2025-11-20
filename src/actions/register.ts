"use server";

import { RegisterSchema } from "../../schemas";
import bcrypt from "bcrypt";
import { db } from "@/db/index";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import * as z from "zod";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // check if user already exists

  const existing = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  if (existing) {
    return { error: "Email already exists." };
  }

  // insert user

  const user = await db.insert(usersTable).values({
    name,
    email,
    password: hashedPassword,
  });

  return { success: "Account was created successfully." };
};
