import { countVotes } from './votes';

export const init = (io: any) => {
  io.on('connection', (socket: any) => {
    console.log('a user connected');

    const emitVoteList = async () => {
      const votesList = await countVotes();
      console.log('votesList', votesList);
      socket.emit('votesList', votesList);
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
