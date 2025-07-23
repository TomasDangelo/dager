import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import { requireAuth } from '../auth/requireAuth';
import { requireAdmin } from '../auth/requireAdmin';
import { errorResponse } from '@/helpers/errorResponse';
import { productSchema } from '@/lib/validation/productSchema';

// Obtener productos (público) con paginación opcional
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "20", 10);

  const products = await prisma.product.findMany({
    skip,
    take,
  });
  return NextResponse.json(products);
}

// Crear producto (solo admin)
export async function POST(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const body = await request.json();
  const parse = productSchema.safeParse(body);
  if (!parse.success) return errorResponse("Datos inválidos", 400);

  const product = await prisma.product.create({
    data: parse.data,
  });
  return NextResponse.json(product, { status: 201 });
}

// Actualizar producto (solo admin)
export async function PUT(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const body = await request.json();
  const { id, ...rest } = body;
  const parse = productSchema.partial().safeParse(rest);
  if (!parse.success) return errorResponse("Datos inválidos", 400);

  const product = await prisma.product.update({
    where: { id },
    data: parse.data,
  });
  return NextResponse.json(product);
}

// Eliminar producto (solo admin)
export async function DELETE(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const body = await request.json();
  const { id } = body;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ message: "Producto eliminado" });
}