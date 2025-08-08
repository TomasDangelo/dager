import { Product as PrismaProduct, Subcategory, Category } from '@prisma/client';

export type CategoryWithSubcategories = Category & {
    subcategories: Subcategory[];
};

export type ProductWithRelations = PrismaProduct & {
    subcategory: Subcategory & {
        categories: Category[];
    };
};

export type Product = PrismaProduct;

export type ProductFiltersType = {
    categorySlug?: string;
    subcategorySlug?: string;
    onSale?: boolean;
    minPrice?: number;
    maxPrice?: number;
}