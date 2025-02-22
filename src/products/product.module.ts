import { Module } from "@nestjs/common";
import { Product } from "src/products/product.entity";
import { ProductController } from "src/products/product.controller";
import { ProductService } from "src/products/product.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    controllers: [ProductController],
    providers: [ProductService],
    imports: [TypeOrmModule.forFeature([Product])],
    exports: [ProductService]
})
export class ProductModule {}