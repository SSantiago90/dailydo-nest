import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  @Type(() => String)
  task: string;

  @IsOptional()
  @Type(() => Boolean)
  done?: boolean

  @IsNumber()  
  @Type(() => Number)
  isNote: 0 | 1 | 2 | 3;
}