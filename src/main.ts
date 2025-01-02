import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 유효성 검사용 파이프
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // class-validator의 유효성 검사 데코레이터를 사용하지 않은 모든 속성 객체를 제거되어 저장
    forbidNonWhitelisted: true, // "property hacked should not exist" : HttpException 을 던짐
    transform: true, // 타입을 받아서 넘겨줄 때(default는 string) 자동으로 실제 타입으로 변환해줌
  }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
