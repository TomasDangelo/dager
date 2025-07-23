import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma/client";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.email) return null;
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  return user;
}