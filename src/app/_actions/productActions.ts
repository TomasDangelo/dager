'use server';

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma/client";
import { productSchema } from "@/lib/validation/productSchema";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { requireAuth } from "../api/auth/requireAuth";
import { requireAdmin } from "../api/auth/requireAdmin";

export async function createOrUpdateProduct(data: any) {
  const user = await requireAuth();
  requireAdmin(user);
  const parsed = productSchema.safeParse(data);
  if (!parsed.success) {
    const msg = parsed.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    throw new Error(`Datos inválidos: ${msg}`);
  }

  let product;
  if (data.id) {
    product = await prisma.product.update({
      where: { id: data.id },
      data: parsed.data as any,
      include: {
        subcategory: { include: { categories: true } }
      }
    });
  } else {
    product = await prisma.product.create({
      data: parsed.data as any,
      include: {
        subcategory: { include: { categories: true } }
      }
    });
  }

  // revalidar páginas que muestran productos
  revalidatePath("/productos");
  revalidatePath("/"); // si en home mostrás productos

  return product;
}

/**
 * Elimina un producto por id.
 */
export async function deleteProductById(id: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("No autenticado");
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user || user.role !== "admin") throw new Error("No autorizado");

  // eliminar (si hay FK en cartItems u orderitems debes eliminar esas referencias primero o usar cascade)
  await prisma.product.delete({ where: { id } });

  revalidatePath("/productos");
  revalidatePath("/");

  return { success: true, id };
}
