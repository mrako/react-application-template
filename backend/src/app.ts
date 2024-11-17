import cors from 'kcors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import Router from 'koa-router';

import * as health from './health';
import * as votes from './votes';

export function createApp(io: any) {
  const app = new Koa();

  if (process.env.NODE_ENV !== 'test') {
    app.use(logger());
  }
  app.use(cors({ credentials: true }));
  app.use(bodyParser());

  app.use(async (ctx, next) => {
    ctx.io = io;
    await next();
  });

  const publicRouter = new Router({ prefix: '/api' });

  publicRouter.get('/_health', health.check);
  publicRouter.get('/votes', votes.list);
  publicRouter.get('/votes/count', votes.count);
  publicRouter.post('/votes', votes.create);
  publicRouter.get('/votes/resett', votes.reset);

  app.use(publicRouter.routes());
  app.use(publicRouter.allowedMethods());

  return app;
}
