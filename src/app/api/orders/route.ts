import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import { requireAuth } from '../auth/requireAuth';
import { errorResponse } from '@/helpers/errorResponse';
import { orderSchema } from '@/lib/validation/orderSchema';

// Obtener órdenes del usuario autenticado con paginación opcional
export async function GET(request: Request) {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);

  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "20", 10);

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    include: { items: true },
    skip,
    take,
  });
  return NextResponse.json(orders);
}

// Crear orden (usuario autenticado)
export async function POST(request: Request) {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);

  const body = await request.json();
  const parse = orderSchema.safeParse(body);
  if (!parse.success) return errorResponse("Datos inválidos", 400);

  const { items, total } = parse.data;

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      items: {
        create: items.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: { items: true },
  });
  return NextResponse.json(order, { status: 201 });
}