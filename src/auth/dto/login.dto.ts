import { Transform } from "class-transformer";
import {IsEmail, IsString, MinLength} from "class-validator";


export class loginDto {
  @IsEmail()
  @MinLength(1)
  email: string;

  @Transform( ({value}) => value.trim())
  @IsString()
  @MinLength(8)
  password: string;
}
