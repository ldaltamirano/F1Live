import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  // Verificamos el Content-Type para evitar errores si la petición no es un formulario válido
  const contentType = request.headers.get("Content-Type") || "";

  if (!contentType.includes("multipart/form-data") && !contentType.includes("application/x-www-form-urlencoded")) {
    // Si el navegador no envía el header correcto, redirigimos en lugar de fallar
    return redirect("/login?error=invalid_request");
  }

  const data = await request.formData();  
  console.log("Form Data Received:", Array.from(data.entries()));
  const password = data.get("password")?.toString().trim();

  // TODO: En el futuro, validar contra la tabla 'users' en Turso
  if (password === "admin123") {
    cookies.set("f1_admin_session", "true", {
      path: "/",
      httpOnly: true,
      secure: import.meta.env.PROD,
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    }); 
    return redirect("/dashboard");
  }

  return redirect("/login?error=invalid");
};
