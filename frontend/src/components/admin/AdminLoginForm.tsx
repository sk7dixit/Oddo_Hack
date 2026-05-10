import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginAdmin } from "../../services/adminService";

import { setAdminToken } from "../../utils/token";
import React from "react";

const AdminLoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data = await loginAdmin(
        email,
        password
      );

      setAdminToken(data.token);

      navigate(
        "/admin/dashboard"
      );
    } catch (err) {
      setError(
        "Invalid credentials"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-[#111]
        p-8
        rounded-2xl
        w-full
        max-w-md
        space-y-5
      "
    >
      <h1 className="text-3xl font-bold text-white">
        Admin Login
      </h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="
          w-full
          p-3
          rounded-lg
          bg-black
          border
          border-zinc-700
          text-white
        "
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
        className="
          w-full
          p-3
          rounded-lg
          bg-black
          border
          border-zinc-700
          text-white
        "
      />

      {error && (
        <p className="text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="
          w-full
          bg-white
          text-black
          py-3
          rounded-lg
          font-semibold
        "
      >
        Login
      </button>
    </form>
  );
};

export default AdminLoginForm;
