export interface SignupFormData {
  email: string;
  code: string;
  password: string;
  referral?: string; 
  agree: boolean;
}