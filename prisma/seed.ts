import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // --- Users ---
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@flairvigo.com' },
    update: {},
    create: {
      email: 'admin@flairvigo.com',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      isEmailVerified: true,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      passwordHash: userPassword,
      firstName: 'Jane',
      lastName: 'Doe',
      role: 'USER',
      isEmailVerified: true,
    },
  });

  // --- Categories ---
  const womenCategory = await prisma.category.upsert({
    where: { slug: 'women' },
    update: {},
    create: { name: 'Women', slug: 'women', description: 'Women perfumes' },
  });

  const menCategory = await prisma.category.upsert({
    where: { slug: 'men' },
    update: {},
    create: { name: 'Men', slug: 'men', description: 'Men perfumes' },
  });

  // --- Products ---
  const scrubTop = await prisma.product.upsert({
    where: { slug: 'the-classic-perfume-women' },
    update: {},
    create: {
      name: 'The Classic Perfume',
      slug: 'the-classic-perfume-women',
      description: 'Our signature luxury fragrance featuring elegant notes and a flattering scent profile.',
      basePrice: 48.00,
      categoryId: womenCategory.id,
      images: {
        create: [
          { url: '/images/perfume_floral.png', isMain: true },
        ],
      },
      variants: {
        create: [
          { sku: 'W-PERF-50-S', color: 'Gold', size: '50ml', inventory: 100 },
          { sku: 'W-PERF-100-M', color: 'Gold', size: '100ml', inventory: 150 },
          { sku: 'W-PERF-150-L', color: 'Gold', size: '150ml', inventory: 80 },
        ],
      },
    },
  });

  const scrubPants = await prisma.product.upsert({
    where: { slug: 'the-premium-body-oil-women' },
    update: {},
    create: {
      name: 'The Premium Body Oil',
      slug: 'the-premium-body-oil-women',
      description: 'Luxurious body oil to perfectly complement your signature scent.',
      basePrice: 58.00,
      categoryId: womenCategory.id,
      images: {
        create: [
          { url: '/images/perfume_designer.png', isMain: true },
        ],
      },
      variants: {
        create: [
          { sku: 'W-OIL-50-S', color: 'Clear', size: '50ml', inventory: 120 },
          { sku: 'W-OIL-100-M', color: 'Clear', size: '100ml', inventory: 130 },
        ],
      },
    },
  });

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
