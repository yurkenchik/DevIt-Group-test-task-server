import {IsNotEmpty, IsUUID} from "class-validator";

export class CreateOrderDto {
    @IsUUID()
    @IsNotEmpty()
    readonly userId: string;
    @IsUUID()
    @IsNotEmpty()
    readonly productId: string;
    readonly quantity: number;
}