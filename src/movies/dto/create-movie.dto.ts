import { IsNumber, IsString } from "class-validator";

export class CreateMovieDto {
    @IsString()
    readonly title: string;
    @IsNumber()
    readonly year: number;
    @IsString({each:true}) // 모든 요소를 하나씩 검사
    readonly genres: string[];
}