import { jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET
);

export async function verifyAdminSession() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token || !process.env.ADMIN_SESSION_SECRET) {
      return false;
    }

    const { payload } = await jwtVerify(token, secret);

    return payload.role === "admin";
  } catch {
    return false;
  }
}