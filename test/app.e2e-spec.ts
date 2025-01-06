import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // 테스팅 환경에서 만들어지는 테스트를 위한 애플리케이션과 브라우저에서 테스트 할 수 있는 진짜 애플리케이션은 다름
    // => 테스팅 환경도 실제 구동 환경의 설정을 그대로 적용시켜줘야 함
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // class-validator의 유효성 검사 데코레이터를 사용하지 않은 모든 속성 객체를 제거되어 저장
        forbidNonWhitelisted: true, // "property hacked should not exist" : HttpException 을 던짐
        transform: true, // 타입을 받아서 넘겨줄 때(default는 string) 자동으로 실제 타입으로 변환해줌
      }));
      
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", () => {
    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([])
    });

    // movie 정상적으로 생성
    it('POST 201', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test",
        year:2000,
        genres:["test"]
      })
      .expect(201);
    })
    
    // 잘못된 생성 요청
    it('POST 400', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"Test",
        year:2000,
        genres:["test"],
        other:"thing" // 잘못된 요청
      })
      .expect(400);
    })

    // 404 나오는지 테스트
    it("DELETE", () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404);
    });

  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get("/movies/1").expect(200);
    })
    // 존재하지 않는 movie
    it('GET 404', () => {
      return request(app.getHttpServer()).get("/movies/999").expect(404);
    })
    it('PATCH 200', () => {
      return request(app.getHttpServer()).patch('/movies/1').send({title:'Updated Test'}).expect(200);
    })
    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    })
  })

});
