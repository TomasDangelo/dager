import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import { requireAuth } from '../auth/requireAuth';
import { errorResponse } from '@/helpers/errorResponse';

export async function POST() {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);

  const cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true },
  });
  if (!cart || cart.items.length === 0) return errorResponse("Carrito vacío", 400);

  // Calcula el total
  let total = 0;
  for (const item of cart.items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    if (!product) return errorResponse("Producto no encontrado", 404);
    total += product.price * item.quantity;
  }

  // Crea la orden
  const order = await prisma.order.create({
    data: {
      userId: user.id,
      total,
      items: {
        create: cart.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
    },
    include: { items: true },
  });

  // Limpia el carrito
  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return NextResponse.json(order, { status: 201 });
}