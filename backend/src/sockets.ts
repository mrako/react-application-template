import { countVotes } from './votes';

export const init = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('a user connected');

    const emitVoteList = async () => {
      socket.emit('votesList', await countVotes());
    };

    emitVoteList();

    socket.on('get votes', async (params: any, fn: any) => {
      try {
        fn(await countVotes());
      } catch (err) {} // tslint:disable-line:no-empty
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
