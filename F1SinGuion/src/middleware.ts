import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ url, cookies, redirect }, next) => {
  // Proteger rutas que empiecen por /dashboard
  if (url.pathname.startsWith("/dashboard")) {
    const session = cookies.get("f1_admin_session");
    
    if (!session || session.value !== "true") {
      return redirect("/login");
    }
  }

  return next();
});
