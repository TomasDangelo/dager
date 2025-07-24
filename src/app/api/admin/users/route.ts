import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import { requireAuth } from '../../auth/requireAuth';
import { requireAdmin } from '../../auth/requireAdmin';
import { userUpdateSchema } from '@/lib/validation/userSchema';
import { errorResponse } from '@/helpers/errorResponse';

// Listar usuarios (admin)
export async function GET() {
  const user = await requireAuth();
  requireAdmin(user);
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  return NextResponse.json(users);
}

// Cambiar rol de usuario (admin)
export async function PATCH(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const { id, role } = await request.json();
  if (!id || !role) return errorResponse("Datos inválidos", 400);

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { role },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
  return NextResponse.json(updatedUser);
}

// Eliminar usuario (admin)
export async function DELETE(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const { id } = await request.json();
  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ message: "Usuario eliminado" });
}