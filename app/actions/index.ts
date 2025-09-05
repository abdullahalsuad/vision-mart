"use server";

import { signIn } from "@/auth";

export async function login(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return response;
  } catch (err: unknown) {
    throw new Error(
      err instanceof Error ? err.message : "Something went wrong"
    );
  }
}
