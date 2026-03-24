import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,              // видаляє невідомі поля
    forbidNonWhitelisted: true,   // кидає помилку, якщо зайві поля
    transform: true,              // автоматично перетворює типи
  }));
  app.enableCors({
    origin: 'http://localhost:5173', // ваш фронтенд
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
