import { Module } from "@nestjs/common";
import { OrderController } from "src/orders/order.controller";
import { OrderService } from "src/orders/order.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/orders/order.entity";
import { UserModule } from "src/users/user.module";
import { ProductModule } from "src/products/product.module";


@Module({
    controllers: [OrderController],
    providers: [OrderService],
    imports: [TypeOrmModule.forFeature([Order]), UserModule, ProductModule],
    exports: [OrderService]
})
export class OrderModule {}