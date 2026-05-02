import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore = await cookies();

  const access = cookieStore.get("accessToken")?.value;
  const refresh = cookieStore.get("refreshToken")?.value;

  if (access || refresh) {
    redirect("/dashboard");
  }

  redirect("/auth");
}
