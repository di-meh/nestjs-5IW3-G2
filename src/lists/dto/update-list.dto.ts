import { PartialType } from '@nestjs/mapped-types';
import { CreateListDto } from './create-list.dto';
import { IsDefined, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateListDto {
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name: string;
}
