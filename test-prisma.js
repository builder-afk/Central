require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const { PrismaClient } = require('@prisma/client');

async function main() {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    });
    const cities = await prisma.cities.findMany();
    console.log(`Found ${cities.length} cities`);
  } catch (err) {
    console.error(err);
  }
}

main();
