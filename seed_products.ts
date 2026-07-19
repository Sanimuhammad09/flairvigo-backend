import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding categories and products...');

  // Create Categories
  const scrubsCat = await prisma.category.upsert({
    where: { slug: 'scrubs' },
    update: {},
    create: {
      name: 'Scrubs',
      slug: 'scrubs',
      description: 'Premium medical scrubs for professionals.',
    },
  });

  const jacketsCat = await prisma.category.upsert({
    where: { slug: 'jackets' },
    update: {},
    create: {
      name: 'Jackets & Lab Coats',
      slug: 'jackets',
      description: 'Professional jackets and lab coats.',
    },
  });

  // Create Products
  const scrubTop = await prisma.product.upsert({
    where: { slug: 'premium-scrub-top' },
    update: { isFeatured: true },
    create: {
      name: 'Premium Scrub Top',
      slug: 'premium-scrub-top',
      description: 'A comfortable and durable scrub top with multiple pockets.',
      basePrice: 15000,
      categoryId: scrubsCat.id,
      isFeatured: true,
      fabricDetails: '72% Polyester, 21% Rayon, 7% Spandex',
      careInstructions: 'Machine wash cold with like colors. Tumble dry low.',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1584982751601-97d883f51f4b?w=800&auto=format&fit=crop&q=60', isMain: true }
        ]
      },
      variants: {
        create: [
          { sku: 'SCRUB-TOP-NAVY-M', color: 'Navy', size: 'M', inventory: 150 },
          { sku: 'SCRUB-TOP-NAVY-L', color: 'Navy', size: 'L', inventory: 120 },
          { sku: 'SCRUB-TOP-BLACK-M', color: 'Black', size: 'M', inventory: 80 }
        ]
      }
    },
  });

  const scrubPants = await prisma.product.upsert({
    where: { slug: 'pro-scrub-pants' },
    update: { isFeatured: true },
    create: {
      name: 'Pro Scrub Pants',
      slug: 'pro-scrub-pants',
      description: 'Flexible scrub pants designed for long shifts.',
      basePrice: 18000,
      categoryId: scrubsCat.id,
      isFeatured: true,
      fabricDetails: '72% Polyester, 21% Rayon, 7% Spandex',
      careInstructions: 'Machine wash cold. Tumble dry low.',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800&auto=format&fit=crop&q=60', isMain: true }
        ]
      },
      variants: {
        create: [
          { sku: 'SCRUB-PANTS-NAVY-M', color: 'Navy', size: 'M', inventory: 200 },
          { sku: 'SCRUB-PANTS-BLACK-M', color: 'Black', size: 'M', inventory: 100 }
        ]
      }
    },
  });

  const labCoat = await prisma.product.upsert({
    where: { slug: 'classic-lab-coat' },
    update: { isFeatured: true },
    create: {
      name: 'Classic Lab Coat',
      slug: 'classic-lab-coat',
      description: 'Professional grade lab coat with tailored fit.',
      basePrice: 25000,
      categoryId: jacketsCat.id,
      isFeatured: true,
      fabricDetails: '100% Cotton',
      careInstructions: 'Dry clean recommended.',
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1605289982774-9a6fef564df8?w=800&auto=format&fit=crop&q=60', isMain: true }
        ]
      },
      variants: {
        create: [
          { sku: 'LAB-COAT-WHITE-M', color: 'White', size: 'M', inventory: 50 },
          { sku: 'LAB-COAT-WHITE-L', color: 'White', size: 'L', inventory: 40 }
        ]
      }
    },
  });

  console.log('Seeding complete! Products and Categories added.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
