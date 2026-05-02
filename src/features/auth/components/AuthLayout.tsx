"use client";

import { useState } from "react";
import LeftSlider from "./LeftSlider";
import AuthHeader from "./AuthHeader";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";


export default function AuthLayout() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="grid min-h-screen grid-cols-2 gap-x-8">
      <LeftSlider />

      <div className="flex flex-col  pt-4">
        <AuthHeader />

        {mode === "login" ? (
          <LoginForm onSwitch={() => setMode("signup")} />
        ) : (
          <SignupForm onSwitch={() => setMode("login")} />
        )}
      </div>
    </div>
  );
}