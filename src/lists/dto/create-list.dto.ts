import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}

