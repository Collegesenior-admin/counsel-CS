import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

declare global {
  var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing from environment variables!");
}

// Configure SSL for production (Vercel)
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: false
  } : false,
  max: 1,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 10000,
})

const adapter = new PrismaPg(pool)

const prismaClientSingleton = () => {
  return new PrismaClient({ 
    adapter,
    log: ['error']
  })
}

const prisma = (globalThis as any).prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') (globalThis as any).prisma = prisma

export { prisma };
