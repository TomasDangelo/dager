import { prisma } from "@/lib/prisma/client";
import type { ProductWithRelations, CategoryWithSubcategories } from "@/types/productTypes";

export async function getProductsServer(opts: {
  skip?: number;
  take?: number;
  categorySlug?: string;
  subcategorySlug?: string;
  onSale?: boolean;
  minPrice?: number;
  maxPrice?: number;
}): Promise<ProductWithRelations[]> {
  const { skip = 0, take = 12, categorySlug, subcategorySlug, onSale, minPrice, maxPrice } = opts;

  const where: any = {};

  // price range
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = {};
    if (minPrice !== undefined) where.price.gte = minPrice;
    if (maxPrice !== undefined) where.price.lte = maxPrice;
  }

  // onSale
  if (onSale !== undefined) where.onSale = onSale;

  // category/subcategory filters (case-insensitive)
  if (categorySlug || subcategorySlug) {
    const subFilter: any = {};

    if (subcategorySlug) {
      subFilter.name = { equals: String(subcategorySlug), mode: "insensitive" };
    }

    if (categorySlug) {
      // categories es una relación many, usamos some + equals insensitivo
      subFilter.categories = {
        some: {
          name: { equals: String(categorySlug), mode: "insensitive" },
          // fallback: contains insensitivo si equal no demuestra efecto
          // name: { contains: String(categorySlug), mode: "insensitive" },
        },
      };
    }
    where.subcategory = { is: subFilter };
  }

  // DEBUG: imprime el where que se ejecutará (útil para ver qué se está enviando a Prisma)
  console.debug("getProductsServer where =", JSON.stringify(where));

  const products = await prisma.product.findMany({
    where,
    skip,
    take,
    include: {
      subcategory: {
        include: { categories: true }
      }
    },
    orderBy: { id: "asc" }
  });

  return products as ProductWithRelations[];
}

export async function fetchCategoriesWithSubcategoriesServer(): Promise<CategoryWithSubcategories[]> {
  const categories = await prisma.category.findMany({
    include: { subcategories: true },
    orderBy: { name: "asc" },
  });
  return categories as CategoryWithSubcategories[];
}
