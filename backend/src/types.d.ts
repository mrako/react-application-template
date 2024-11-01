import { PrismaClient } from '@prisma/client';

declare module 'koa' {
  interface DefaultContext {
    prisma: PrismaClient;
  }
}
