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
  const category = searchParams.get("category");
  const onSale = searchParams.get("onSale") === "true";
  const minPrice = parseFloat(searchParams.get("minPrice") || "0");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "100000");

  const products = await prisma.product.findMany({
    skip,
    take,
    where: {
      ...(category && { category }),
      ...(searchParams.has("onSale") && { onSale }),
      price: {
        gte: minPrice,
        lte: maxPrice,
      }
    }
  });

  return NextResponse.json(products);
}

// Crear producto (solo admin)
/* export async function POST(request: Request) {
  const user = await requireAuth();
  requireAdmin(user);
  const body = await request.json();
  const parse = productSchema.safeParse(body);
  if (!parse.success) return errorResponse("Datos inválidos", 400);

  const product = await prisma.product.create({
    data: parse.data,
  });
  return NextResponse.json(product, { status: 201 });
} */

//Crear muchos productos -bulk- (ELIMINAR)
export async function POST(request: Request) {
  const user = await requireAuth();

  const body = await request.json();

  if (!Array.isArray(body)) {
    return errorResponse("Se esperaba un array de productos", 400);
  }

  const parsed = body.map(product => productSchema.safeParse(product));
  const invalid = parsed.find(p => !p.success);
  if (invalid) return errorResponse("Uno o más productos no son válidos", 400);

  const data = parsed.map(p => p.success && p.data);
  const created = await prisma.product.createMany({
    data: data as any, // Tipado temporal
    skipDuplicates: true,
  });

  return NextResponse.json({ count: created.count }, { status: 201 });
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