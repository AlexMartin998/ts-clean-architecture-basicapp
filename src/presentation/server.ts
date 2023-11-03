import express, { Router } from 'express';
import compression from 'compression';
import path from 'path';


interface Options {
  port: number;
  router: Router;
  public_path?: string;
}


export class Server {

  private app = express();
  private readonly port: number;
  private readonly publicPath: string;
  private readonly router: Router;



  // Evitar dependencias ocultas
  constructor(options: Options) {
    const { port, router, public_path = 'public' } = options;
    
    this.port = port;
    this.publicPath = public_path;
    this.router = router;
  }

  
  
  async start() {
    ///* Middlewares
    this.app.use( express.json() ); // receive JSON in req.body
    this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded
    this.app.use( compression() )



    ///* Public Folder / Servir Static Content
    this.app.use( express.static( this.publicPath ) );



    ///* Routes
    this.app.use( this.router );



    ///* SPA
    // // // servir el contenido de React y su Router cuando refresh page
    // Asi mantenemos      Router del SPA      sin refresh de React
    this.app.get('*', (_req, res) => {
      // absolute path:
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );

      res.sendFile(indexPath);
    });
    


    ///* Express Server
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${ this.port }`);
    });

  }

}