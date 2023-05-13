import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsDefined()
    @IsNotEmpty()
    name: string
}
