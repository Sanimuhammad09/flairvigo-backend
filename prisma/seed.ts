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
    create: { name: 'Women', slug: 'women', description: 'Women scrubs' },
  });

  const menCategory = await prisma.category.upsert({
    where: { slug: 'men' },
    update: {},
    create: { name: 'Men', slug: 'men', description: 'Men scrubs' },
  });

  // --- Products ---
  const scrubTop = await prisma.product.upsert({
    where: { slug: 'the-classic-scrub-top-women' },
    update: {},
    create: {
      name: 'The Classic Scrub Top',
      slug: 'the-classic-scrub-top-women',
      description: 'Our signature V-neck scrub top featuring 3 pockets and a flattering tailored fit.',
      basePrice: 48.00,
      categoryId: womenCategory.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop', isMain: true },
        ],
      },
      variants: {
        create: [
          { sku: 'W-TOP-NVY-S', color: 'Navy', size: 'S', inventory: 100 },
          { sku: 'W-TOP-NVY-M', color: 'Navy', size: 'M', inventory: 150 },
          { sku: 'W-TOP-BLK-S', color: 'Black', size: 'S', inventory: 80 },
        ],
      },
    },
  });

  const scrubPants = await prisma.product.upsert({
    where: { slug: 'the-jogger-scrub-pants-women' },
    update: {},
    create: {
      name: 'The Jogger Scrub Pants',
      slug: 'the-jogger-scrub-pants-women',
      description: 'Athletic-inspired jogger scrub pants with 6 pockets and a comfortable yoga waistband.',
      basePrice: 58.00,
      categoryId: womenCategory.id,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop', isMain: true },
        ],
      },
      variants: {
        create: [
          { sku: 'W-JOG-NVY-S', color: 'Navy', size: 'S', inventory: 120 },
          { sku: 'W-JOG-NVY-M', color: 'Navy', size: 'M', inventory: 130 },
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
