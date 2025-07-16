import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './common/exceptions/HttpExceptionHandler';
import { AppLogger } from './common/services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new GlobalExceptionFilter(app.get(AppLogger)));
  app.enableCors({ origin: '*', credentials: true });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
