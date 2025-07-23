import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import { requireAuth } from '../auth/requireAuth';
import { errorResponse } from '@/helpers/errorResponse';

// Obtener carrito del usuario autenticado
export async function GET() {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);

  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true },
  });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: user.id } });
  }
  return NextResponse.json(cart);
}

// Agregar producto al carrito
export async function POST(request: Request) {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);

  const { productId, quantity } = await request.json();
  if (!productId || !quantity || quantity < 1) return errorResponse("Datos inválidos", 400);

  let cart = await prisma.cart.findUnique({ where: { userId: user.id } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId: user.id } });
  }

  // Si el producto ya está en el carrito, actualiza la cantidad
  const existingItem = await prisma.cartItem.findFirst({
    where: { cartId: cart.id, productId },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: { cartId: cart.id, productId, quantity },
    });
  }

  const updatedCart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true },
  });
  return NextResponse.json(updatedCart);
}

// Eliminar producto del carrito
export async function DELETE(request: Request) {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);

  const { productId } = await request.json();
  if (!productId) return errorResponse("Datos inválidos", 400);

  const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
  if (!cart) return errorResponse("Carrito no encontrado", 404);

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId },
  });

  const updatedCart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: true },
  });
  return NextResponse.json(updatedCart);
}