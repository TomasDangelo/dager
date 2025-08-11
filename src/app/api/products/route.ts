import { NextResponse } from 'next/server';
import { errorResponse } from '@/helpers/errorResponse';
import { productSchema } from '@/lib/validation/productSchema';
import { getProductsServer } from '@/services/products.server';

/**
 * Obtener productos (público) con paginación opcional
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const skip = parseInt(searchParams.get('skip') || '0', 10);
    const take = parseInt(searchParams.get('take') || '20', 10);
    const categorySlug = searchParams.get('categorySlug')?.toLowerCase() || undefined;
    const subcategorySlug = searchParams.get('subcategorySlug')?.toLowerCase() || undefined;
    const onSale = searchParams.get('onSale') === 'true';
    const hasOnSale = searchParams.has('onSale');
    const minPrice = searchParams.has('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined;
    const maxPrice = searchParams.has('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined;

    const products = await getProductsServer({
      skip,
      take,
      categorySlug,
      subcategorySlug,
      onSale: hasOnSale ? onSale : undefined,
      minPrice,
      maxPrice,
    });

    return NextResponse.json(products);
  } catch (err) {
    console.error(err);
    return errorResponse('Error al obtener productos', 500);
  }
}

/**
 * Crear muchos productos -bulk- (para carga inicial)
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!Array.isArray(body)) {
      return errorResponse('Se esperaba un array de productos', 400);
    }

    const parsed = body.map((product) => productSchema.safeParse(product));
    const invalid = parsed.find((p) => !p.success);
    if (invalid) return errorResponse('Uno o más productos no son válidos', 400);

    const data = parsed.map((p) => p.success && p.data);

    const { prisma } = await import('@/lib/prisma/client');
    const created = await prisma.product.createMany({
      data: data as any,
      skipDuplicates: true,
    });

    return NextResponse.json({ count: created.count }, { status: 201 });
  } catch (err) {
    console.error(err);
    return errorResponse('Error al crear productos', 500);
  }
}
