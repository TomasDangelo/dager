// app/api/admin/products/route.ts

import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import { requireAuth } from '../../auth/requireAuth';
import { requireAdmin } from '../../auth/requireAdmin';
import { productSchema } from '@/lib/validation/productSchema';
import { errorResponse } from '@/helpers/errorResponse';
import { revalidatePath } from "next/cache";

// Listar productos (admin)
export async function GET() {
  const user = await requireAuth();
  requireAdmin(user);
  const products = await prisma.product.findMany({
    include: {
      subcategory: true,
    },
  });
  return NextResponse.json(products);
}

// Crear producto (admin)
export async function POST(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const body = await request.json();
  const parse = productSchema.safeParse(body);
  if (!parse.success) return errorResponse("Datos inválidos", 400);

  const product = await prisma.product.create({ data: parse.data });
  revalidatePath("/productos", 'layout');
  return NextResponse.json(product, { status: 201 });
}

// Actualizar producto (admin)
export async function PUT(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const { id, ...rest } = await request.json();
  const parse = productSchema.partial().safeParse(rest);
  if (!parse.success) return errorResponse("Datos inválidos", 400);

  const product = await prisma.product.update({
    where: { id },
    data: parse.data,
  });
  revalidatePath("/productos", 'layout');
  revalidatePath("/");
  return NextResponse.json(product);
}

// Eliminar producto (admin)
export async function DELETE(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const { id } = await request.json();
  await prisma.product.delete({ where: { id } });
  revalidatePath("/productos", 'layout');
  return NextResponse.json({ message: "Producto eliminado" });
}