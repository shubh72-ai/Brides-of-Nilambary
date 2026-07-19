import { z } from "zod";
import { adminCookieHeader, createAdminToken, verifyAdminPassword } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const parsed = loginSchema.safeParse(await request.json());

  if (!parsed.success) {
    return Response.json({ error: "Enter the admin email and password." }, { status: 400 });
  }

  const verified = await verifyAdminPassword(parsed.data.email, parsed.data.password);

  if (!verified.ok) {
    return Response.json({ error: verified.reason }, { status: 401 });
  }

  const token = await createAdminToken(parsed.data.email);

  return Response.json(
    { redirectTo: "/admin", status: "authenticated" },
    { headers: { "Set-Cookie": adminCookieHeader(token) } },
  );
}
