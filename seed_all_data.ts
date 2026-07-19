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
    { name: 'Scrub Tops', slug: 'scrub-tops', image: '/images/product-top.png' },
    { name: 'Scrub Pants', slug: 'scrub-pants', image: '/images/product-pants.png' },
    { name: 'Underscrubs', slug: 'underscrubs', image: '/images/product-jacket.png' },
    { name: 'Outerwear', slug: 'outerwear', image: '/images/product-jacket.png' },
    { name: 'Accessories', slug: 'accessories', image: '/images/product-shoes.png' },
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
  // Women's Scrub Tops
  await prisma.product.upsert({
    where: { slug: 'womens-classic-scrub-top' },
    update: {},
    create: {
      name: 'Women\'s Classic Scrub Top',
      slug: 'womens-classic-scrub-top',
      description: 'Classic fit scrub top for women.',
      basePrice: 45000,
      categoryId: catMap['scrub-tops'],
      collectionId: womenCol.id,
      isFeatured: true,
      images: { create: [{ url: '/images/product-top.png', isMain: true }] },
      variants: {
        create: [
          { sku: 'W-TOP-NAVY-S', color: 'Navy', colorHex: '#000080', size: 'S', inventory: 50 },
          { sku: 'W-TOP-NAVY-M', color: 'Navy', colorHex: '#000080', size: 'M', inventory: 50 },
        ]
      }
    }
  });

  // Women's Scrub Pants
  await prisma.product.upsert({
    where: { slug: 'womens-classic-scrub-pants' },
    update: {},
    create: {
      name: 'Women\'s Classic Scrub Pants',
      slug: 'womens-classic-scrub-pants',
      description: 'Classic fit scrub pants for women.',
      basePrice: 50000,
      categoryId: catMap['scrub-pants'],
      collectionId: womenCol.id,
      isFeatured: true,
      images: { create: [{ url: '/images/product-pants.png', isMain: true }] },
      variants: {
        create: [
          { sku: 'W-PANT-NAVY-S', color: 'Navy', colorHex: '#000080', size: 'S', inventory: 50 },
          { sku: 'W-PANT-NAVY-M', color: 'Navy', colorHex: '#000080', size: 'M', inventory: 50 },
        ]
      }
    }
  });

  // Men's Scrub Tops
  await prisma.product.upsert({
    where: { slug: 'mens-pro-scrub-top' },
    update: {},
    create: {
      name: 'Men\'s Pro Scrub Top',
      slug: 'mens-pro-scrub-top',
      description: 'Pro fit scrub top for men.',
      basePrice: 48000,
      categoryId: catMap['scrub-tops'],
      collectionId: menCol.id,
      isFeatured: true,
      images: { create: [{ url: '/images/product-top.png', isMain: true }] },
      variants: {
        create: [
          { sku: 'M-TOP-BLK-M', color: 'Black', colorHex: '#000000', size: 'M', inventory: 40 },
          { sku: 'M-TOP-BLK-L', color: 'Black', colorHex: '#000000', size: 'L', inventory: 40 },
        ]
      }
    }
  });

  // Men's Scrub Pants
  await prisma.product.upsert({
    where: { slug: 'mens-pro-scrub-pants' },
    update: {},
    create: {
      name: 'Men\'s Pro Scrub Pants',
      slug: 'mens-pro-scrub-pants',
      description: 'Pro fit scrub pants for men.',
      basePrice: 55000,
      categoryId: catMap['scrub-pants'],
      collectionId: menCol.id,
      isFeatured: true,
      images: { create: [{ url: '/images/product-pants.png', isMain: true }] },
      variants: {
        create: [
          { sku: 'M-PANT-BLK-M', color: 'Black', colorHex: '#000000', size: 'M', inventory: 40 },
          { sku: 'M-PANT-BLK-L', color: 'Black', colorHex: '#000000', size: 'L', inventory: 40 },
        ]
      }
    }
  });

  // Underscrub
  await prisma.product.upsert({
    where: { slug: 'unisex-underscrub' },
    update: {},
    create: {
      name: 'Unisex Premium Underscrub',
      slug: 'unisex-underscrub',
      description: 'Comfortable long sleeve underscrub.',
      basePrice: 35000,
      categoryId: catMap['underscrubs'],
      collectionId: womenCol.id, // Put in women's as a default
      isFeatured: true,
      images: { create: [{ url: '/images/product-jacket.png', isMain: true }] },
      variants: {
        create: [
          { sku: 'UNDER-GRY-M', color: 'Grey', colorHex: '#808080', size: 'M', inventory: 60 },
          { sku: 'UNDER-GRY-L', color: 'Grey', colorHex: '#808080', size: 'L', inventory: 60 },
        ]
      }
    }
  });

  console.log('Seeding complete!');
}

main().catch(e => console.error(e)).finally(() => prisma.$disconnect());
