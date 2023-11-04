import { envs } from '../src/config/envs';
import { AppRouter } from '../src/presentation/router';
import { Server } from '../src/presentation/server';


export const testServer = new Server({
  port: envs.PORT,
  router: AppRouter.routes
});
