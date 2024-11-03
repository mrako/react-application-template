import { prisma } from './prisma';

export const init = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('a user connected');

    const emitVoteList = async () => {
      socket.emit('votesList', await prisma.vote.findMany());
    };

    emitVoteList();

    socket.on('get votes', async (params: any, fn: any) => {
      try {
        fn(await prisma.vote.findMany());
      } catch (err) {} // tslint:disable-line:no-empty
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
