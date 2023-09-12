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
  await app.listen(process.env.APP_PORT);
}
main();
