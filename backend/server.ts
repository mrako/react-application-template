import http from 'http';
import { Server } from 'socket.io';

import { createApp } from './src/app';
import * as sockets from './src/sockets';

import { prisma } from './src/prisma';
import { createClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';

const port = process.env.PORT || 9000;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

async function initServer() {
  const server = http.createServer();
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  // Initialize Redis clients
  const pubClient = createClient({ url: REDIS_URL });
  const subClient = pubClient.duplicate();

  await pubClient.connect();
  await subClient.connect();

  // Apply the Redis adapter
  io.adapter(createAdapter(pubClient, subClient));

  // Initialize the Koa app with io after Redis setup
  const app = createApp(io);
  server.on('request', app.callback());

  sockets.init(io);

  const cleanResources = async (signal: any) => {
    console.log(`Received ${signal}, closing connections.`);
    try {
      await server.close();
      await prisma.$disconnect();
      await pubClient.disconnect();
      await subClient.disconnect();
    } catch (error) {
      console.log(`Error closing connection: ${error}.`);
      process.exit(1);
    }
    process.exit(0);
  };

  process.on('SIGINT', cleanResources);
  process.on('SIGTERM', cleanResources);

  process.on('exit', () => console.log('Exiting.'));

  server.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

initServer().catch((err) => {
  console.error("Error starting server:", err);
});
