"use server";

import { cookies } from "next/headers";


const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function loginAction(prevState: unknown, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;


  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    const body = JSON.stringify({ email, password });

    if (!res.ok || !data.access_token) {
      return { success: false, message: "ایمیل یا رمز عبور اشتباه است" };
    }

    const c = await cookies();
    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax" as const,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    };

    c.set("access_token", data.access_token, {
      ...cookieOptions,
      maxAge: data.expires_in || 3600,
    });

    c.set("refresh_token", data.refresh_token, {
      ...cookieOptions,
      maxAge: 14 * 24 * 60 * 60,
    });

    return { success: true, message: "" };
  } catch (error) {
    return { success: false, message: "خطای سرور" };
  }
}

export async function logoutAction() {
  const c = await cookies();
  const accessToken = c.get("access_token")?.value;

  if (accessToken) {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  c.delete("access_token");
  c.delete("refresh_token");
}