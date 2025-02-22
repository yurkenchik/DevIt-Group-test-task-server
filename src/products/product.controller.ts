import { Body, Controller, Post } from "@nestjs/common";
import { ProductService } from "src/products/product.service";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { Product } from "src/products/product.entity";

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ) {}

    @Post()
    async createProduct(@Body() createProductDto: CreateProductDto): Promise<Product> {
        return this.productService.createProduct(createProductDto);
    }
}