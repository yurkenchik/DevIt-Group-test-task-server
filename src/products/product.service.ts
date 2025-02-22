import { Injectable } from "@nestjs/common";
import { Product } from "src/products/product.entity";
import { CreateProductDto } from "src/products/dto/create-product.dto";
import { ProductNotFoundException } from "src/common/exceptions/client/product-not-found.exception";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) {}

    async createProduct(createProductDto: CreateProductDto): Promise<Product> {
        const productInsertResult: InsertResult = await this.productRepository
            .createQueryBuilder()
            .insert()
            .into(Product)
            .values(createProductDto)
            .execute();

        const insertedUserId = productInsertResult.identifiers[productInsertResult.identifiers.length - 1].id;
        return this.getProductById(insertedUserId);
    }

    async getProductById(productId: string): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (!product) {
            throw new ProductNotFoundException();
        }
        return product;
    }
}