import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDto } from "./create-movie.dto";

// npm i @nestjs/mapped-types : 타입을 변환시키고 사용할 수 있게 하는 패키지
export class UpdateMovieDto extends PartialType(CreateMovieDto) {
    // PartialType을 사용하면 CreateMovieDto의 모든 필드를 선택적으로 만드는 데코레이터와 타입 변환이 자동으로 적용된다.
    // 그래서 title, year, genres가 모두 선택적(optional) 필드가 된다.
}