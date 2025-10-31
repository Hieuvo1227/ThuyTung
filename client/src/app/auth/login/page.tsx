"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/utils/stores/authStore";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage: React.FC = () => {
  const { isLoading, login, sendOTP } = useAuthStore();

  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("🔐 Login form submitted with data:", formData);

    if (!validate()) {
      console.log("❌ Form validation failed");
      return;
    }

    console.log("✅ Form validation passed, attempting login...");
    const response = await login(formData.email, formData.password);
    console.log("📤 Login response received:", response);

    // If login failed, return
    if (!response?.success) {
      console.log("❌ Login failed with message:", response?.message);
      return;
    }

    // Check if user needs verification (not active)
    if (response.data && !response.data.isActive) {
      console.log("⚠️ User needs verification, redirecting to OTP page");
      router.push(
        `/auth/verification?email=${encodeURIComponent(
          formData.email
        )}&isPasswordReset=false`
      );

      await sendOTP(formData.email);

      return;
    }

    console.log("✅ Login successful, redirecting to admin dashboard");
    router.push("/admin");
  };

  return (
    <div>
      <h1 className="text-primary text-2xl font-bold text-center mb-8">
        Đăng nhập
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-primary-500 mb-2"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Nhập email của bạn"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-primary-500 mb-2"
          >
            Mật khẩu
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-400">{errors.password}</p>
          )}
        </div>

        <div className="mb-6">
          <a
            onClick={(e) => {
              e.preventDefault();

              if (!isLoading) router.push("/auth/forgot-password");
            }}
            className={`text-primary-500 hover:text-primary-700 text-sm underline cursor-pointer ${
              isLoading ? "pointer-events-none opacity-70" : ""
            }`}
          >
            Quên mật khẩu?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;