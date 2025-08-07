// src/lib/prisma/seed.ts (versión corregida y final)

import { PrismaClient, Category, Subcategory } from '@prisma/client';

const prisma = new PrismaClient();

const subcategoriesData = [
  { name: 'Remeras', mains: ['Hombre', 'Mujer'] },
  { name: 'Zapatillas', mains: ['Hombre'] },
  { name: 'Musculosas', mains: ['Hombre', 'Mujer'] },
  { name: 'Shorts', mains: ['Hombre', 'Mujer'] },
  { name: 'Calzas', mains: ['Mujer'] },
  { name: 'Bikers', mains: ['Mujer'] },
  { name: 'Tops', mains: ['Mujer'] },
  { name: 'Conjuntos', mains: ['Mujer'] },
  { name: 'Buzos', mains: ['Unisex'] },
];

const productsData = [
  {
    name: "Buzo Térmico Unisex",
    price: 6500,
    stock: 8,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTUCMPfPA16UReH4vY3JXijKk-6gK9z4J6Xc5OFIMKys1HfkT6jhK4wM2_wvUmXNZJrBBNuopXtweFqYq9NtDDcMfrKKZse9VGeEzOmknqDZIaMn5RurUGOV55BYQTxAbWxAir1UsQ&usqp=CAc",
    description: "Buzo térmico con capucha.",
    onSale: true,
    saleText: "SALE",
  },
  {
    name: "Musculosa Classic Mujer",
    price: 3700,
    stock: 12,
    image: "https://images.pexels.com/photos/4051720/pexels-photo-4051720.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&format=webp",
    description: "Musculosa clásica de algodón para mujer.",
    onSale: false,
    saleText: null,
  },
  {
    name: "Top Deportivo Mujer",
    price: 3800,
    stock: 15,
    image: "https://images.pexels.com/photos/414029/pexels-photo-414029.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&format=webp",
    description: "Top deportivo elástico con soporte para mujer.",
    onSale: false,
    saleText: null,
  },
  {
    name: "Short Running Clásico Hombre",
    price: 3200,
    stock: 16,
    image: "https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&format=webp",
    description: "Short clásico y cómodo para running hombre.",
    onSale: false,
    saleText: null,
  },
  {
    name: "Remera Casual Hombre",
    price: 3900,
    stock: 9,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTaknglQPBXIwifmdhq5XrNQAK_wmbVmG7xBzYp8a1GrLN3wIvvFxTujcj0-H3bKSE7C2F38fZsyW3y1EnmYMaEseTv2jhAD3oc_9sk9Z-vd_oeF2nCBJuCjRw&usqp=CAc",
    description: "Remera casual de algodón para uso diario hombre.",
    onSale: false,
    saleText: null,
  },
  {
    name: "Musculosa Algodon Hombre",
    price: 3600,
    stock: 10,
    image: "https://img.ltwebstatic.com/images3_pi/2024/10/08/4b/17283717262f6268e8f802c5b2795950013583beec_thumbnail_560x.webp",
    description: "Musculosa de algodón suave para hombre.",
    onSale: true,
    saleText: null,
  },
  {
    name: "Buzo Urbano Unisex",
    price: 6200,
    stock: 9,
    image: "https://www.dexter.com.ar/on/demandware.static/-/Sites-365-dabra-catalog/default/dw4a269d09/products/TWHD27F02/TWHD27F02-1.JPG",
    description: "Buzo urbano con capucha, unisex.",
    onSale: true,
    saleText: "SALE 20",
  },
  {
    name: "Short Running Hombre",
    price: 3200,
    stock: 20,
    image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&format=webp",
    description: "Short ligero y comodo para correr, diseñado para hombre.",
    onSale: false,
    saleText: null,
  },
  {
    name: "Top Sujeción Alta Mujer",
    price: 4200,
    stock: 11,
    image: "https://images.pexels.com/photos/3937174/pexels-photo-3937174.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&format=webp",
    description: "Top con sujeción extra para actividades intensas.",
    onSale: true,
    saleText: "15% OFF",
  },
  {
    name: "Camiseta Running Hombre",
    price: 4500,
    stock: 12,
    image: "https://img.kwcdn.com/garner-api/transfer/2023-3-5/430d56612f183bf6ebf7d830a6fb23cf.jpg?imageView2/2/w/800/q/70/format/webp",
    description: "Camiseta técnica transpirable ideal para running hombre.",
    onSale: true,
    saleText: "20% OFF",
  },
  {
    name: "Top Fitness Mujer",
    price: 4300,
    stock: 7,
    image: "https://sevensportio.vtexassets.com/arquivos/ids/264610-800-auto?v=638290991685630000&width=800&height=auto&aspect=true",
    description: "Top fitness para yoga y pilates.",
    onSale: false,
    saleText: null,
  },
  {
    name: "Top Rosa Vibrante Mujer",
    price: 4100,
    stock: 12,
    image: "https://images.pexels.com/photos/1433568/pexels-photo-1433568.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940&format=webp",
    description: "Top vibrante y ajustado para mujer.",
    onSale: false,
    saleText: null,
  }
];

async function main() {
  console.log('Iniciando el seeder...');

  // Limpiar las tablas existentes
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.subcategory.deleteMany({});

  const mainCategoriesData = ['Hombre', 'Mujer', 'Unisex'];
  const createdMainCategories: Record<string, Category> = {};

  for (const name of mainCategoriesData) {
    const category = await prisma.category.create({ data: { name } });
    createdMainCategories[name] = category;
  }
  
  console.log('Categorías principales creadas.');

  const createdSubcategories: Record<string, Subcategory> = {};

  for (const item of subcategoriesData) {
    const mainCategoryConnections = item.mains.map(mainName => ({
      id: createdMainCategories[mainName].id,
    }));
    
    const subcategory = await prisma.subcategory.create({
      data: {
        name: item.name,
        categories: {
          connect: mainCategoryConnections,
        },
      },
    });
    createdSubcategories[item.name] = subcategory;
  }

  console.log('Subcategorías creadas.');

  for (const productData of productsData) {
    let subcategoryName: string | null = null;
    
    // Lógica para asociar productos a una subcategoría única
    if (productData.name.includes('Mujer')) {
        if (productData.name.includes('Top')) subcategoryName = 'Tops';
        else if (productData.name.includes('Musculosa')) subcategoryName = 'Musculosas';
        else if (productData.name.includes('Short')) subcategoryName = 'Shorts';
        else if (productData.name.includes('Remera')) subcategoryName = 'Remeras';
    } else if (productData.name.includes('Hombre')) {
        if (productData.name.includes('Remera') || productData.name.includes('Camiseta')) subcategoryName = 'Remeras';
        else if (productData.name.includes('Musculosa')) subcategoryName = 'Musculosas';
        else if (productData.name.includes('Short')) subcategoryName = 'Shorts';
        else if (productData.name.includes('Zapatilla')) subcategoryName = 'Zapatillas';
    } else if (productData.name.includes('Buzo') || productData.name.includes('Unisex')) {
        subcategoryName = 'Buzos';
    }

    if (subcategoryName && createdSubcategories[subcategoryName]) {
      await prisma.product.create({
        data: {
          ...productData,
          subcategory: { connect: { id: createdSubcategories[subcategoryName].id } },
        },
      });
    } else {
      console.warn(`[SKIP] No se pudo asociar una subcategoría para el producto: "${productData.name}"`);
    }
  }

  console.log('Seed de productos finalizado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });