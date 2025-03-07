import { IsString, IsOptional, IsNumber, IsDate, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  @Type(() => String)
  task: string;

  @IsDate()
  @Type(() => Date)
  date: Date

  @IsOptional()
  @Type(() => Boolean)
  done?: boolean

  @IsNumber()  
  @Type(() => Number)
  isNote: 0 | 1 | 2 | 3;  
}