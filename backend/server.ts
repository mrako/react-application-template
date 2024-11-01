/* eslint-disable no-console */
import http from 'http';
import { Server } from 'socket.io';

import { createApp } from './src/app';
import * as sockets from './src/sockets';

import { prisma } from './src/prisma';

const port = process.env.PORT || 9000;

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from frontend origin
    methods: ["GET", "POST"]
  }
});

const app = createApp(io);
server.on('request', app.callback());

sockets.init(io.listen(server));

const cleanResources = async (signal: any) => {
  console.log(`Received ${signal}, closing connections.`);
  try {
    if (server) {
      await server.close();
    }

    await prisma.$disconnect();
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
