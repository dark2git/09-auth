"use client";

import css from "./SignUpPage.module.css";
import { useState } from "react";
import type { AxiosError } from "axios";
import { register } from "@/lib/api/clientApi";
import { RegisterRequest } from "@/types/user";
import { useRouter } from "next/navigation";
import { useSessionStore } from "@/lib/store/authStore";
export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { setUser } = useSessionStore();

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as RegisterRequest;
      const res = await register(formValues);
      // Виконуємо редірект або відображаємо помилку
      if (res) {
        setUser(res);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      const axiosErr = err as AxiosError<{ error?: string }>;
      setError(
        axiosErr.response?.data?.error ??
          axiosErr.message ??
          "Oops... some error"
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
