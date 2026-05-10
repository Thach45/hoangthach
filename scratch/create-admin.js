const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@hoangthach.com';
  const password = 'Thach18012005';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      name: 'Thach Admin',
      role: 'ADMIN',
    },
    create: {
      email,
      password: hashedPassword,
      name: 'Thach Admin',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin account created/updated successfully!');
  console.log('Email:', user.email);
  console.log('Password: (the one you provided)');
}

main()
  .catch((e) => {
    console.error('❌ Error creating admin:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
