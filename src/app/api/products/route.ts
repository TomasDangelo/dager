import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import { errorResponse } from '@/helpers/errorResponse';
import { productSchema } from '@/lib/validation/productSchema';


type andFiltersType = {
  category?: string;
  onSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
  price?: {
    gte?: number;
    lte?: number;
  };
}
// Obtener productos (público) con paginación opcional
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const skip = parseInt(searchParams.get("skip")  || "0", 10);
  const take = parseInt(searchParams.get("take")  || "20", 10);
  const categorySlug = searchParams.get("categorySlug") || undefined;
  const subcategorySlug = searchParams.get("subcategorySlug") || undefined;
  const onSale = searchParams.get("onSale") === "true";
  const hasOnSale = searchParams.has("onSale");
  const minPrice = searchParams.has("minPrice") ? parseFloat(searchParams.get("minPrice")!) : undefined;
  const maxPrice = searchParams.has("maxPrice") ? parseFloat(searchParams.get("maxPrice")!) : undefined;

  const andFilters: andFiltersType[] = [];

  if (hasOnSale) andFilters.push({ onSale });
  // solo agregamos si vino minPrice o maxPrice por params
  if (minPrice !== undefined || maxPrice !== undefined) {
    andFilters.push({
      price: {
        ...(minPrice !== undefined ? { gte: minPrice } : {}),
        ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
      }
    });
  }

  const whereClause: any = { AND: andFilters };

  if (categorySlug || subcategorySlug) {
    whereClause.subcategory = {
      name: subcategorySlug ? subcategorySlug.replace(/-/g, ' ') : undefined,
      categories: {
        some: {
          name: categorySlug ? categorySlug.replace(/-/g, ' ') : undefined,
        },
      },
    };
  }

  const products = await prisma.product.findMany({
    skip,
    take,
    where: whereClause,
    include: {
      subcategory: {
        include: {
          categories: true,
        },
      },
    },
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
/*   const user = await requireAuth(); */

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




