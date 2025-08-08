import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import { errorResponse } from '@/helpers/errorResponse';

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        subcategories: true,
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return errorResponse("Error al obtener categorías", 500);
  }
}