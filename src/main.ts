import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { RestPipe } from './common/pipes/rest/rest.pipe';

async function main() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'verbose', 'log'],
  });
  app.useGlobalPipes(new RestPipe(),
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    }),
  )

  app.setGlobalPrefix('api')
  app.enableCors();
  console.log("Starting optisave")
  await app.listen(process.env.PORT);
  console.log(`Optisave running on port ${process.env.PORT}`)
}
main();
