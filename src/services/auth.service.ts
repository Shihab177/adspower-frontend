import api from "@/lib/api";


// OTP send
export const sendOtp = async (email: string) => {
  const { data } = await api.post("/auth/send-otp", { email });
  return data;
};

// Signup verify
export const verifySignup = async (payload: {
  email: string;
  otp: string;
  password: string;
  referral?: string;
}) => {
  const { data } = await api.post("/auth/verify-signup", payload);
  return data;
};

export const login = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", {
    email,
    password,
  });

  return data;
};

export const getMe = async () => {
  const { data } = await api.get("/auth/me");
  return data.user;
};

export const logout = async () => {
  const { data } = await api.post("/auth/logout");
  return data;
};