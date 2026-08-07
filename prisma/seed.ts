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
  const scrubTopsCat = await prisma.category.upsert({
    where: { slug: 'scrub-tops' },
    update: {},
    create: { name: 'Scrub Tops', slug: 'scrub-tops', description: 'Premium scrub tops' },
  });

  const scrubDressesCat = await prisma.category.upsert({
    where: { slug: 'scrub-dresses' },
    update: {},
    create: { name: 'Scrub Dresses', slug: 'scrub-dresses', description: 'Premium scrub dresses' },
  });

  const pantsCat = await prisma.category.upsert({
    where: { slug: 'pants' },
    update: {},
    create: { name: 'Pants', slug: 'pants', description: 'Premium scrub pants' },
  });

  const accessoriesCat = await prisma.category.upsert({
    where: { slug: 'accessories' },
    update: {},
    create: { name: 'Accessories', slug: 'accessories', description: 'Accessories for future use' },
  });

  const womensApparelCat = await prisma.category.upsert({
    where: { slug: 'womens-apparel' },
    update: {},
    create: { name: "Women's Apparel", slug: 'womens-apparel', description: 'Women\'s apparel for future expansion' },
  });

  const giftSetsCat = await prisma.category.upsert({
    where: { slug: 'gift-sets' },
    update: {},
    create: { name: 'Gift Sets', slug: 'gift-sets', description: 'Gift sets for future expansion' },
  });

  // --- Collections ---
  const sidrahCollection = await prisma.collection.upsert({
    where: { slug: 'sidrah-collection' },
    update: {},
    create: { name: 'Sidrah Collection', slug: 'sidrah-collection', description: 'The Sidrah Collection features elegant, modest scrubs designed for supreme comfort and precision.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9njcCrx7iDvf_KH1UsJIvODLmlEvnfazkFX58LRYggap_wnVvCBTwTCsQ7Px4rtYjjH86JKpHiCl-11Qc7TTVwq98x7Xz3pD2BLFCJ1YSrOIvFstTKhoGam69YHLXQlFxWUQIZQSky5-3SGFF2OVpuQuA4v1Z9BZra-aVvNMCDSZHep3vaoVDOTmASTmnlahR3vyhTY7pAN-xCuUARu5EBGLfiJiGyqU9JPVbKRLSE3ZRYeJXkfi-Zw' },
  });

  const laynaCollection = await prisma.collection.upsert({
    where: { slug: 'layna-collection' },
    update: {},
    create: { name: 'Layna Collection', slug: 'layna-collection', description: 'The Layna Collection offers modern, versatile scrubs for everyday excellence.', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqV3D2D37nB2sKjQ1uL8X5l2ZqB0eH6o6_YwA3tF5gE3F9_r7J5tP6O8bL9xT4J2W8K0G9N6H1Z2A3tF5gE3F9_r7J5tP6O8bL9xT4J2W8K0G9N6H1Z2A3tF5gE3F9_r7J5tP6O8bL9xT4J2W8K0G9N6H1Z2A3tF5g' },
  });

  // --- Products ---
  
  // Sizes array to iterate over
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  
  // 1. Sidrah Scrub Top
  const sidrahTop = await prisma.product.upsert({
    where: { slug: 'sidrah-scrub-top' },
    update: {},
    create: {
      name: 'Sidrah Scrub Top',
      slug: 'sidrah-scrub-top',
      description: 'Elegant scrub top with tailored fit.',
      basePrice: 45000,
      categoryId: scrubTopsCat.id,
      collectionId: sidrahCollection.id,
      images: {
        create: [
          { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqV3D2D37nB2sKjQ1uL8X5l2ZqB0eH6o6_YwA3tF5gE3F9_r7J5tP6O8bL9xT4J2W8K0G9N6H1Z2A3tF5gE3F9_r7J5tP6O8bL9xT4J2W8K0G9N6H1Z2A3tF5gE3F9_r7J5tP6O8bL9xT4J2W8K0G9N6H1Z2A3tF5g', isMain: true },
        ],
      },
      variants: {
        create: sizes.map((size) => ({
          sku: `SID-TOP-${size}`,
          color: 'Burgundy',
          size: size,
          inventory: 50,
        })),
      },
    },
  });

  // 2. Sidrah Wide Leg Pants
  const sidrahPants = await prisma.product.upsert({
    where: { slug: 'sidrah-wide-leg-pants' },
    update: {},
    create: {
      name: 'Sidrah Wide Leg Pants',
      slug: 'sidrah-wide-leg-pants',
      description: 'Comfortable wide leg scrub pants.',
      basePrice: 55000,
      categoryId: pantsCat.id,
      collectionId: sidrahCollection.id,
      images: {
        create: [
          { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQqV3D2D37nB2sKjQ1uL8X5l2ZqB0eH6o6_YwA3tF5gE3F9_r7J5tP6O8bL9xT4J2W8K0G9N6H1Z2A3tF5gE3F9_r7J5tP6O8bL9xT4J2W8K0G9N6H1Z2A3tF5gE3F9_r7J5tP6O8bL9xT4J2W8K0G9N6H1Z2A3tF5g', isMain: true },
        ],
      },
      variants: {
        create: sizes.map((size) => ({
          sku: `SID-PNT-${size}`,
          color: 'Burgundy',
          size: size,
          inventory: 50,
        })),
      },
    },
  });

  // 3. Layna Scrub Dress
  const laynaDress = await prisma.product.upsert({
    where: { slug: 'layna-scrub-dress' },
    update: {},
    create: {
      name: 'Layna Scrub Dress',
      slug: 'layna-scrub-dress',
      description: 'Professional and stylish scrub dress.',
      basePrice: 65000,
      categoryId: scrubDressesCat.id,
      collectionId: laynaCollection.id,
      images: {
        create: [
          { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9njcCrx7iDvf_KH1UsJIvODLmlEvnfazkFX58LRYggap_wnVvCBTwTCsQ7Px4rtYjjH86JKpHiCl-11Qc7TTVwq98x7Xz3pD2BLFCJ1YSrOIvFstTKhoGam69YHLXQlFxWUQIZQSky5-3SGFF2OVpuQuA4v1Z9BZra-aVvNMCDSZHep3vaoVDOTmASTmnlahR3vyhTY7pAN-xCuUARu5EBGLfiJiGyqU9JPVbKRLSE3ZRYeJXkfi-Zw', isMain: true },
        ],
      },
      variants: {
        create: sizes.map((size) => ({
          sku: `LAY-DRS-${size}`,
          color: 'Navy',
          size: size,
          inventory: 50,
        })),
      },
    },
  });

  // 4. Layna Pants
  const laynaPants = await prisma.product.upsert({
    where: { slug: 'layna-pants' },
    update: {},
    create: {
      name: 'Layna Pants',
      slug: 'layna-pants',
      description: 'Classic scrub pants for everyday wear.',
      basePrice: 55000,
      categoryId: pantsCat.id,
      collectionId: laynaCollection.id,
      images: {
        create: [
          { url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9njcCrx7iDvf_KH1UsJIvODLmlEvnfazkFX58LRYggap_wnVvCBTwTCsQ7Px4rtYjjH86JKpHiCl-11Qc7TTVwq98x7Xz3pD2BLFCJ1YSrOIvFstTKhoGam69YHLXQlFxWUQIZQSky5-3SGFF2OVpuQuA4v1Z9BZra-aVvNMCDSZHep3vaoVDOTmASTmnlahR3vyhTY7pAN-xCuUARu5EBGLfiJiGyqU9JPVbKRLSE3ZRYeJXkfi-Zw', isMain: true },
        ],
      },
      variants: {
        create: sizes.map((size) => ({
          sku: `LAY-PNT-${size}`,
          color: 'Navy',
          size: size,
          inventory: 50,
        })),
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
