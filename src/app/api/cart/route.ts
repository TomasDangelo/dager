import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import { requireAuth } from '../auth/requireAuth';
import { errorResponse } from '@/helpers/errorResponse';

// Obtener carrito del usuario autenticado con detalles de producto
export async function GET() {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);

  let cart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: { include: { product: true } } },
  });
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId: user.id },
      include: { items: { include: { product: true } } },
    });
    cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    });
  }
  return NextResponse.json(cart);
}

// Agregar producto al carrito (suma cantidad si ya existe)
export async function POST(request: Request) {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);

  const { productId, quantity } = await request.json();
  if (!productId || !quantity || quantity < 1) return errorResponse("Datos inválidos", 400);

  // Transacción para evitar condiciones de carrera
  const result = await prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id: productId } });
    if (!product) throw errorResponse("Producto no encontrado", 404);
    if (quantity > product.stock) throw errorResponse("No hay suficiente stock", 400);

    let cart = await tx.cart.findUnique({ where: { userId: user.id } });
    if (!cart) cart = await tx.cart.create({ data: { userId: user.id } });

    const existingItem = await tx.cartItem.findFirst({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product.stock) throw errorResponse("Lo sentimos. No hay suficiente stock", 400);
      await tx.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: newQuantity },
      });
    } else {
      await tx.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }

    return tx.cart.findUnique({
      where: { userId: user.id },
      include: { items: { include: { product: true } } },
    });
  });

  return NextResponse.json(result);
}

// Actualizar cantidad de un producto en el carrito
export async function PATCH(request: Request) {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);

  const { productId, quantity } = await request.json();
  if (!productId || typeof quantity !== "number" || quantity < 1) return errorResponse("Datos inválidos", 400);

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return errorResponse("Producto no encontrado", 404);
  if (quantity > product.stock) return errorResponse("No hay suficiente stock", 400);

  const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
  if (!cart) return errorResponse("Carrito no encontrado", 404);

  const cartItem = await prisma.cartItem.findFirst({ where: { cartId: cart.id, productId } });
  if (!cartItem) return errorResponse("Producto no está en el carrito", 404);

  await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: { quantity },
  });

  const updatedCart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: { include: { product: true } } },
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
    include: { items: { include: { product: true } } },
  });
  return NextResponse.json(updatedCart);
}

// Vaciar carrito
export async function PUT() {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);

  const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
  if (!cart) return errorResponse("Carrito no encontrado", 404);

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  const updatedCart = await prisma.cart.findUnique({
    where: { userId: user.id },
    include: { items: { include: { product: true } } },
  });
  return NextResponse.json(updatedCart);
}