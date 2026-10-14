import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretValue = process.env.ADMIN_SESSION_SECRET;

export async function isAdminAuthenticated(): Promise<boolean> {
  if (!secretValue) {
    console.error("ADMIN_SESSION_SECRET is not configured.");
    return false;
  }

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token) {
      return false;
    }

    const secret = new TextEncoder().encode(secretValue);

    const { payload } = await jwtVerify(token, secret, {
      algorithms: ["HS256"],
    });

    return payload.role === "admin";
  } catch {
    return false;
  }
}