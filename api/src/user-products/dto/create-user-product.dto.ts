import { IsNotEmpty } from 'class-validator';

export class CreateUserProductDTO {
    @IsNotEmpty()
    productId: number;
}
