import { SignJWT } from "jose";

const secret = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "temporary-secret"
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { username, password } = body;

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return Response.json(
        { error: "Invalid username or password." },
        { status: 401 }
      );
    }

    const token = await new SignJWT({
      role: "admin",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(secret);

    const response = Response.json({
      message: "Login successful.",
    });

    response.headers.append(
      "Set-Cookie",
      `admin_session=${token}; HttpOnly; Path=/; Max-Age=28800; SameSite=Lax${
        process.env.NODE_ENV === "production" ? "; Secure" : ""
      }`
    );

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return Response.json(
      { error: "Unable to process login." },
      { status: 500 }
    );
  }
}