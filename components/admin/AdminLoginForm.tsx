"use client";

import { useState } from "react";

export function AdminLoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(formData: FormData) {
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/login", {
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(result.error || "Unable to sign in.");
      return;
    }

    window.location.href = result.redirectTo || "/admin";
  }

  return (
    <form action={submit} className="admin-login-form glass-panel">
      <span className="section-kicker">Studio admin</span>
      <h1>Sign in to manage Brides of Nilambary.</h1>
      <p>Use `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `JWT_SECRET` before launch.</p>
      <label>
        <span>Email</span>
        <input name="email" placeholder="admin@example.com" type="email" />
      </label>
      <label>
        <span>Password</span>
        <input name="password" placeholder="Password" type="password" />
      </label>
      <button className="luxury-button luxury-button-gold" disabled={loading} type="submit">
        {loading ? "Checking" : "Sign in"}
      </button>
      {error ? <small className="form-error">{error}</small> : null}
    </form>
  );
}
