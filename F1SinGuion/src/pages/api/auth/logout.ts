import type { APIRoute } from "astro";

export const prerender = false;


export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("f1_admin_session", { path: "/" });
  return redirect("/dashboard/login");
};