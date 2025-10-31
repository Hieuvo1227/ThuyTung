"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/utils/stores/authStore";
import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();

  const { isLoading, sendOTP } = useAuthStore();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const res = await sendOTP(email);

    if (!res) {
      return;
    }

    toast.success("Đã gửi mã OTP về email của bạn");

    router.push(
      `/auth/verification?email=${encodeURIComponent(email)}&isPasswordReset=true`
    );
  };

  return (
    <div>
      <h1 className="text-primary text-2xl font-bold text-center mb-8">
        Quên mật khẩu
      </h1>

      <p className="text-primary-400 text-sm mb-6 text-center">
        Nhập email của bạn và chúng tôi sẽ gửi mã OTP để giúp bạn tiến hành cài lại mật khẩu mới.
      </p>

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
            type="email"
            name="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
          {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-200"
          disabled={isLoading}
        >
          {isLoading ? "Đang gửi..." : "Gửi mã"}
        </Button>

        <div className="mt-6 text-center">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (!isLoading) router.push("/auth/login");
            }}
            className={`text-primary-500 hover:text-primary-700 text-sm underline cursor-pointer ${
              isLoading ? "pointer-events-none opacity-70" : ""
            }`}
          >
            Quay lại trang đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
