# Dev

1. Clone the .env.template and create .env
2. Execute the command ```docker compose -f docker-compose.dev.yml --env-file .env.dev up --build```.
3. Rebuild the client prism ````npm run prism:migrate:prod````.
   
   ```
    "prism:migrate:prod: prism migrate deploys,
   ```
