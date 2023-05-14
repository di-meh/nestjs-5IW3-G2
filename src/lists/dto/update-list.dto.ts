import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class UpdateListDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;
}
