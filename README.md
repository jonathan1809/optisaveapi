
# Ejecutar en desarrollo

 1. Clonar repositorio
 2. Ejecutar
 ```
 yarn install
 ```
 3. Tener CLI instalado
```
 npm i -g @nestjs/cli
```
4. Levantar la base de datos
```
 docker-compose up -d
```

5. Populate data with seed command 
```
yarn seed:dev
```

##Stack usado
* NestJs
* MongoDb

Errors founded in development
1. If you get this error when run nest command using yarn as package manage remove the yarn.lock and execute yarn 
nest C:\Users\jonat\OneDrive\Escritorio\optisaveapi\node_modules\wrap-ansi\index.js:2 const stringWidth = require('string-width');
