import { NextResponse } from 'next/server';
import { requireAuth } from '../../auth/requireAuth';
import { requireAdmin } from '../../auth/requireAdmin';
import { errorResponse } from '@/helpers/errorResponse';
import { productSchema } from '@/lib/validation/productSchema';
import { prisma } from '@/lib/prisma/client';

// Obtener un producto específico
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        subcategory: {
          include: {
            categories: true,
          },
        },
      },
    });

    if (!product) {
      return errorResponse('Producto no encontrado', 404);
    }

    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return errorResponse('Error al obtener el producto', 500);
  }
}

// Actualizar un producto (solo admin)
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth();
    requireAdmin(user);

    const body = await request.json();
    const { id } = params;
    const parse = productSchema.partial().safeParse(body);

    if (!parse.success) return errorResponse('Datos inválidos', 400);

    const product = await prisma.product.update({
      where: { id },
      data: parse.data,
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return errorResponse('Error al actualizar el producto', 500);
  }
}

// Eliminar un producto (solo admin)
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await requireAuth();
    requireAdmin(user);

    const { id } = params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: 'Producto eliminado' });
  } catch (err) {
    console.error(err);
    return errorResponse('Error al eliminar el producto', 500);
  }
}
