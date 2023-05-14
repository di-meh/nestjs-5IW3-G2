import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateListDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
