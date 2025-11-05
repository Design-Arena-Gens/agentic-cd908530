"use client";

import { FormEvent, useMemo, useState } from "react";
import styles from "./LoginForm.module.css";

type FormState = {
  email: string;
  password: string;
  remember: boolean;
};

const initialState: FormState = {
  email: "",
  password: "",
  remember: false
};

export default function LoginForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState<string>("");

  const isDisabled = useMemo(
    () => status === "loading" || form.email.trim() === "" || form.password.trim() === "",
    [status, form.email, form.password]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 900));

      if (!form.email.includes("@")) {
        throw new Error("Please enter a valid email address.");
      }

      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setForm(initialState);
      }, 1400);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong, please try again.";
      setError(message);
      setStatus("error");
    }
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.card}>
        <header className={styles.header}>
          <div className={styles.badge}>Aurora</div>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Log in to access your personalized dashboard experience.</p>
        </header>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label}>
            <span>Email</span>
            <input
              aria-label="Email address"
              autoComplete="email"
              className={styles.input}
              onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
              placeholder="you@example.com"
              type="email"
              value={form.email}
            />
          </label>
          <label className={styles.label}>
            <span>Password</span>
            <input
              aria-label="Password"
              autoComplete="current-password"
              className={styles.input}
              onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
              placeholder="••••••••"
              type="password"
              value={form.password}
            />
          </label>
          <div className={styles.actions}>
            <label className={styles.remember}>
              <input
                checked={form.remember}
                className={styles.checkbox}
                onChange={(event) => setForm((prev) => ({ ...prev, remember: event.target.checked }))}
                type="checkbox"
              />
              <span>Remember me</span>
            </label>
            <a className={styles.link} href="#forgot-password">
              Forgot password?
            </a>
          </div>
          <button className={styles.submit} disabled={isDisabled} type="submit">
            {status === "loading" ? "Signing in…" : "Sign in"}
          </button>
          {status === "success" && <p className={styles.success}>Success! Redirecting…</p>}
          {status === "error" && <p className={styles.error}>{error}</p>}
        </form>
        <footer className={styles.footer}>
          <span>New here?</span>
          <a className={styles.link} href="#create-account">
            Create an account
          </a>
        </footer>
      </section>
    </main>
  );
}
