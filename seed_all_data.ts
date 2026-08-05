import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Collections...');
  const womenCol = await prisma.collection.upsert({
    where: { slug: 'women' },
    update: {},
    create: { name: 'Women', slug: 'women', description: "Women's collection" },
  });

  const menCol = await prisma.collection.upsert({
    where: { slug: 'men' },
    update: {},
    create: { name: 'Men', slug: 'men', description: "Men's collection" },
  });

  console.log('Seeding Categories...');
  const categories = [
    { name: 'Eau de Parfum', slug: 'eau-de-parfum', image: '/images/perfume_floral.png' },
    { name: 'Eau de Toilette', slug: 'eau-de-toilette', image: '/images/perfume_designer.png' },
    { name: 'Travel Sizes', slug: 'travel-sizes', image: '/images/perfume_luxury.png' },
    { name: 'Gift Sets', slug: 'gift-sets', image: '/images/perfume_oud.png' },
    { name: 'Accessories', slug: 'accessories', image: '/images/perfume_product.png' },
  ];

  const catMap: Record<string, string> = {};
  for (const c of categories) {
    const cat = await prisma.category.upsert({
      where: { slug: c.slug },
      update: { image: c.image },
      create: { name: c.name, slug: c.slug, image: c.image },
    });
    catMap[c.slug] = cat.id;
  }

  console.log('Seeding Products...');
  await prisma.product.upsert({
    where: { slug: 'womens-classic-perfume' },
    update: {},
    create: {
      name: 'Women\'s Classic Perfume',
      slug: 'womens-classic-perfume',
      description: 'Classic fit perfume for women.',
      basePrice: 45000,
      categoryId: catMap['eau-de-parfum'],
      collectionId: womenCol.id,
      isFeatured: true,
      images: { create: [{ url: '/images/perfume_floral.png', isMain: true }] },
      variants: {
        create: [
          { sku: 'W-PERF-GLD-S', color: 'Gold', colorHex: '#FFD700', size: '50ml', inventory: 50 },
          { sku: 'W-PERF-GLD-M', color: 'Gold', colorHex: '#FFD700', size: '100ml', inventory: 50 },
        ]
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'womens-classic-body-oil' },
    update: {},
    create: {
      name: 'Women\'s Classic Body Oil',
      slug: 'womens-classic-body-oil',
      description: 'Classic luxury body oil for women.',
      basePrice: 50000,
      categoryId: catMap['eau-de-toilette'],
      collectionId: womenCol.id,
      isFeatured: true,
      images: { create: [{ url: '/images/perfume_designer.png', isMain: true }] },
      variants: {
        create: [
          { sku: 'W-OIL-GLD-S', color: 'Gold', colorHex: '#FFD700', size: '50ml', inventory: 50 },
          { sku: 'W-OIL-GLD-M', color: 'Gold', colorHex: '#FFD700', size: '100ml', inventory: 50 },
        ]
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'mens-pro-cologne' },
    update: {},
    create: {
      name: 'Men\'s Pro Cologne',
      slug: 'mens-pro-cologne',
      description: 'Pro signature cologne for men.',
      basePrice: 48000,
      categoryId: catMap['eau-de-parfum'],
      collectionId: menCol.id,
      isFeatured: true,
      images: { create: [{ url: '/images/perfume_oud.png', isMain: true }] },
      variants: {
        create: [
          { sku: 'M-COL-BLK-M', color: 'Black', colorHex: '#000000', size: '100ml', inventory: 40 },
          { sku: 'M-COL-BLK-L', color: 'Black', colorHex: '#000000', size: '150ml', inventory: 40 },
        ]
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'mens-pro-body-spray' },
    update: {},
    create: {
      name: 'Men\'s Pro Body Spray',
      slug: 'mens-pro-body-spray',
      description: 'Pro fit body spray for men.',
      basePrice: 55000,
      categoryId: catMap['eau-de-toilette'],
      collectionId: menCol.id,
      isFeatured: true,
      images: { create: [{ url: '/images/perfume_designer.png', isMain: true }] },
      variants: {
        create: [
          { sku: 'M-SPR-BLK-M', color: 'Black', colorHex: '#000000', size: '100ml', inventory: 40 },
          { sku: 'M-SPR-BLK-L', color: 'Black', colorHex: '#000000', size: '150ml', inventory: 40 },
        ]
      }
    }
  });

  await prisma.product.upsert({
    where: { slug: 'unisex-premium-perfume' },
    update: {},
    create: {
      name: 'Unisex Premium Perfume',
      slug: 'unisex-premium-perfume',
      description: 'Luxurious signature unisex perfume.',
      basePrice: 35000,
      categoryId: catMap['travel-sizes'],
      collectionId: womenCol.id,
      isFeatured: true,
      images: { create: [{ url: '/images/perfume_luxury.png', isMain: true }] },
      variants: {
        create: [
          { sku: 'UNI-PERF-GRY-M', color: 'Grey', colorHex: '#808080', size: '50ml', inventory: 60 },
          { sku: 'UNI-PERF-GRY-L', color: 'Grey', colorHex: '#808080', size: '100ml', inventory: 60 },
        ]
      }
    }
  });

  console.log('Seeding complete!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
