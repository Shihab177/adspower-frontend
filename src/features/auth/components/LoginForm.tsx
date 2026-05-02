"use client";

import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, Info } from "lucide-react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import SocialMedia from "./SocialMedia";
import { getMe, login } from "@/services/auth.service";
import { useAuth } from "@/provider/authProvider";

type FormData = {
  email: string;
  password: string;
};

type Props = {
  onSwitch: () => void;
};

export default function LoginForm({ onSwitch }: Props) {
  const router = useRouter();
  const { setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await login(data.email, data.password);

      const user = await getMe();
      setUser(user);
      toast.success(res.message || "Login success");
      router.push("/dashboard");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-md mx-auto flex flex-col space-y-6"
    >
      <h2 className="text-xl font-semibold">Log in</h2>

      {/* Email */}
      <div>
        <label className="text-sm mb-1">E-Mail/Phone number</label>
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
          <Mail size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Enter your email address or phone number"
            className="bg-transparent outline-none w-full text-sm"
            {...register("email", { required: "Email is required" })}
          />
          <Info size={16} className="text-gray-400" />
        </div>
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <div className="flex justify-between text-sm mb-1">
          <label>Password</label>
          <span className="text-blue-500 cursor-pointer text-xs">
            Forget Password?
          </span>
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
          <Lock size={18} className="text-gray-400 mr-2" />
          <input
            type="password"
            placeholder="Enter password"
            className="bg-transparent outline-none w-full text-sm"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
          />
          <Eye size={16} className="text-gray-400 cursor-pointer" />
          <Info size={16} className="text-gray-400 ml-2" />
        </div>

        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Remember */}
      <div className="flex items-center mb-4">
        <input type="checkbox" className="mr-2" />
        <span className="text-sm">Remember password</span>
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white py-3 rounded-lg mb-4 hover:bg-blue-700 transition"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>

      {/* Divider */}
      <div className="text-center text-gray-400 text-sm mb-3">
        New users will auto-register
      </div>

      {/* Social */}
      <SocialMedia />

      {/* Terms */}
      <p className="text-xs text-gray-500 mb-2 text-center">
        By logging in, you agree to the{" "}
        <span className="text-blue-500 underline">Terms of Use</span> and{" "}
        <span className="text-blue-500 underline">Privacy Policy</span>
      </p>

      {/* Signup */}
      <p className="text-sm text-center">
        or{" "}
        <span onClick={onSwitch} className="text-blue-500 cursor-pointer">
          Sign up
        </span>
      </p>
    </form>
  );
}
