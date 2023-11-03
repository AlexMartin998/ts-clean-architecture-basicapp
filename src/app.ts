import { envs } from './config/envs';
import { AppRouter } from './presentation/router';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


function main() {

  // Evitar dependencias ocultas
  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
    router: AppRouter.routes
  });

  server.start();
}