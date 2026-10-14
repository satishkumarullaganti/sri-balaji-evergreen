
export async function POST() {
  const response = Response.json({
    message: "Logged out successfully.",
  });

  response.headers.append(
    "Set-Cookie",
    "admin_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax" +
      (process.env.NODE_ENV === "production" ? "; Secure" : "")
  );

  return response;
}
