import express from 'express';
import path from 'path';


interface Options {
  port: number;
  public_path?: string;
}


export class Server {

  private app = express();
  private readonly port: number;
  private readonly publicPath: string;


  // Evitar dependencias ocultas
  constructor(options: Options) {
    const { port, public_path = 'public' } = options;
    this.port = port;
    this.publicPath = public_path;
  }

  
  
  async start() {
    ///* Middlewares


    ///* Public Folder / Servir Static Content
    this.app.use( express.static( this.publicPath ) );


    ///* SPA
    // // // servir el contenido de React y su Router cuando refresh page
    // Asi mantenemos Router del    SPA    sin refresh de React
    this.app.get('*', (_req, res) => {
      // absolute path:
      const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );

      res.sendFile(indexPath);
    });
    

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${ this.port }`);
    });

  }

}