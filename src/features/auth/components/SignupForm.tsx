"use client";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

import SocialMedia from "./SocialMedia";
import { useRouter } from "next/navigation";
import { sendOtp, verifySignup } from "@/services/auth.service";

type FormData = {
  email: string;
  otp: string;
  password: string;
  referral?: string;
  agree: boolean;
};

type Props = {
  onSwitch: () => void;
};

export default function SignupForm({ onSwitch }: Props) {
  const [loading, setLoading] = useState(false);
   const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      referral: "",
      agree: false,
    },
  });

  // 📩 Send OTP
  const handleSendOtp = async () => {
    const email = getValues("email");

    if (!email) return alert("Email required");

    try {
      setLoading(true);
      const res = await sendOtp(email);
      alert(res.message || "OTP sent");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // 🧾 Signup submit
  const onSubmit = async (data: FormData) => {
    if (!data.agree) return alert("Accept terms first");

    try {
      setLoading(true);

      const res = await verifySignup({
        email: data.email,
        otp: data.otp,
        password: data.password,
        referral: data.referral,
      });

      alert(res.message || "Account created");

        router.push("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      alert(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-md mx-auto flex flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">
        <h2 className="text-lg font-semibold">By e-mail</h2>

        {/* Email */}
        <div>
          <label className="text-sm">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* OTP */}
        <div>
          <label className="text-sm">Verification code</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 p-2 border border-gray-300 rounded-md"
              {...register("otp", { required: "OTP is required" })}
            />

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              className="px-3 text-sm border border-blue-500 text-blue-500 rounded-md"
            >
              Get code
            </button>
          </div>

          {errors.otp && (
            <p className="text-red-500 text-sm">{errors.otp.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Referral */}
        <div>
          <label className="text-sm">Referral code</label>
          <input
            type="text"
            placeholder="(Optional)"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            {...register("referral")}
          />
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("agree")} />
          <span>
            I agree to <a className="text-blue-500">Terms of Use</a> and{" "}
            <a className="text-blue-500">Privacy Policy</a>
          </span>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          {loading ? "Processing..." : "Sign up"}
        </button>
      </form>

      {/* Divider */}
      <div className="my-4 text-center text-sm text-gray-500">Or</div>

      {/* Social */}
      <SocialMedia />

      {/* Login */}
      <p className="text-center text-sm mt-4">
        Already have an account?{" "}
        <span onClick={onSwitch} className="text-blue-500 cursor-pointer">
          Log in
        </span>
      </p>
    </div>
  );
}