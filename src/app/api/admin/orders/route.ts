import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import { requireAuth } from '../../auth/requireAuth';
import { requireAdmin } from '../../auth/requireAdmin';
import { errorResponse } from '@/helpers/errorResponse';

// Listar todas las órdenes (admin)
export async function GET() {
  const user = await requireAuth();
  requireAdmin(user);
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } }, user: true },
  });
  return NextResponse.json(orders);
}

// Cambiar estado de una orden (admin)
export async function PATCH(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const { id, status } = await request.json();
  if (!id || !status) return errorResponse("Datos inválidos", 400);

  const updatedOrder = await prisma.order.update({
    where: { id },
    data: { status },
    include: { items: { include: { product: true } }, user: true },
  });
  return NextResponse.json(updatedOrder);
}

// Eliminar orden (admin)
export async function DELETE(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const { id } = await request.json();
  await prisma.order.delete({ where: { id } });
  return NextResponse.json({ message: "Orden eliminada" });
}