import { prisma } from './prisma';

export const countVotes = async () => {
  try {
    const voteCounts = await prisma.vote.groupBy({
      by: ['option'],
      _count: {
        option: true,
      },
    });

    return voteCounts.reduce((acc: any, vote: any) => {
      acc[vote.option] = vote._count.option;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error fetching vote counts:', error);
  }
};

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

  ctx.io.emit('votesList', countVotes());
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
