import { prisma } from '@/lib/prisma/client';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import  {requireAuth} from '../auth/requireAuth' 
import { errorResponse } from '@/helpers/errorResponse';
import { userSchema, userUpdateSchema } from '@/lib/validation/userSchema';


//Obtener todos los usuarios (solo admin)
export async function GET(request: Request) {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);
  if (user.role !== "admin") return errorResponse("Solo admin", 403);
  const { searchParams } = new URL(request.url);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const take = parseInt(searchParams.get("take") || "20", 10);

  try {
    const users = await prisma.user.findMany({
      skip,
      take,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    return NextResponse.json(users);
  } catch (error) {
    return errorResponse("Error obteniendo usuarios", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parse = userSchema.safeParse(body);
    if (!parse.success) return errorResponse("Datos inválidos", 400);
    const { name, email, password } = parse.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return errorResponse("El usuario ya existe", 409);

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: "user" },
      select: { id: true, name: true, email: true, role: true, createdAt: true }, //No pasamos la password
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return errorResponse("Error creando usuario", 500);
  }
}

// Actualizar un usuario (solo el propio usuario)
export async function PUT(request: Request) {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);
  try {
    const body = await request.json();
    const parse = userUpdateSchema.safeParse(body);
    if (!parse.success) return errorResponse("Datos inválidos", 400);

    const data: any = {};
    if (parse.data.name) data.name = parse.data.name;
    if (parse.data.email) data.email = parse.data.email;
    if (parse.data.password) data.password = await bcrypt.hash(parse.data.password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data,
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return errorResponse("Error actualizando usuario", 500);
  }
}

// Eliminar un usuario (solo el propio usuario)
export async function DELETE() {
  const user = await requireAuth();
  if (!user) return errorResponse("No autorizado", 401);
  try {
    await prisma.user.delete({ where: { id: user.id } });
    return NextResponse.json({ message: 'Usuario eliminado' });
  } catch (error) {
    return errorResponse("Error eliminando usuario", 500);
  }
}