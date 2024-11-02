import { prisma } from './prisma';

export const list = async (ctx: any) => {
  const votes = await prisma.vote.findMany();
  ctx.body = votes;
};

export const create = async (ctx: any) => {
  const { option } = ctx.request.body;
  const newVote = await prisma.vote.create({
    data: { option },
  });
  ctx.body = newVote;

  const updatedVotes = await prisma.vote.findMany();
  ctx.io.emit('votesList', updatedVotes);
};

export const reset = async (ctx: any) => {
  try {
    await prisma.$transaction([
      prisma.vote.deleteMany(),
    ]);

    ctx.body = { message: 'Database reset successful' };
    ctx.status = 200;
  } catch (error) {
    console.error('Database reset error:', error);
    ctx.body = { message: 'Database reset failed', error };
    ctx.status = 500;
  }
};
