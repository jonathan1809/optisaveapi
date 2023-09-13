# Used Stack
* [NestJs](https://docs.nestjs.com/)
* [MongoDb](https://www.mongodb.com/docs/)
* [Mongoose](https://docs.nestjs.com/techniques/mongodb)
* [Handlebars](https://handlebarsjs.com/)
* [MJML](https://mjml.io/)
# Execute on local

 1. Clone repository
 2. Execute
 ```
 yarn install
 ```
 3. Install NestJs CLI 
```
 npm i -g @nestjs/cli
```
4. Install docker and docker-compose

5. Run database locally
```
 docker-compose up -d
```

6. Clone .env.template and rename as .env

7. Fill .env variables with local values

8. Populate data with seed command 
```
yarn seed:dev
```

9. Run service locally
```
yarn start:dev
```

Errors founded in development
1. If you get this error when run nest command using yarn as package manage remove the yarn.lock and execute yarn 
nest C:\Users\jonat\OneDrive\Escritorio\optisaveapi\node_modules\wrap-ansi\index.js:2 const stringWidth = require('string-width');

2. When docker run the build command we get the following error and we need to set the version to all the dependency with as is mention in this thread https://github.com/nestjs/nest/issues/11660

error
```
const stringWidth = require('string-width');
0.967                     ^
0.967
0.967 Error [ERR_REQUIRE_ESM]: require() of ES Module /project/node_modules/string-width/index.js from /project/node_modules/wrap-ansi/index.js not supported.
0.967 Instead change the require of /project/node_modules/string-width/index.js in /project/node_modules/wrap-ansi/index.js to a dynamic import() which is available in all CommonJS modules.
```

Solution
```
"resolutions": {
  "wrap-ansi": "7.0.0",
  "string-width": "4.1.0"
}
```