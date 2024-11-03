import { PrismaClient } from '@prisma/client';
import http from 'http';
import { Server } from 'socket.io';
import request from 'supertest';
import { createApp } from '../src/app';

const prisma = new PrismaClient();
const app = createApp(new Server(http.createServer()));
const server = request(app.callback());

beforeAll(async () => {
  await prisma.vote.create({
    data: { option: '5' },
  });
});

afterAll(async () => {
  await prisma.vote.deleteMany();
  await prisma.$disconnect();
});

describe('Vote API Endpoints', () => {
  it('GET /api/votes - should return an array of votes', async () => {
    const response = await server.get('/api/votes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('POST /api/votes - should create a new vote', async () => {
    const newVote = { option: '6' };
    const response = await server.post('/api/votes').send(newVote);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.option).toBe(newVote.option);
  });
});
