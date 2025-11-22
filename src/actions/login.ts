"use server";

import { auth } from "@/server/auth";
import { LoginSchema } from "../../schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { email, password } = validatedFields.data;

  try {
    await auth.api.signInEmail({
      body: { email, password },
    });
    return { success: "Signed In." };
  } catch (err) {
    return { error: `${err}` };
  }
};
