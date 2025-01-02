import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 유효성 검사용 파이프
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true, // "property hacked should not exist"
    transform: true, // 타입을 받아서 넘겨줄 때(default는 string) 자동으로 실제 타입으로 변환해줌
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
