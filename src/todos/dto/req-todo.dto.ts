import { IsString, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTodoDto {
  @IsString()
  @Type(() => String)
  task: string;

  @IsOptional()
  @Type(() => Boolean)
  done?: boolean

  @Type(() => Number)
  isNote: 0 | 1 | 2 | 3;
}