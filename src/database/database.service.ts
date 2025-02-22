import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";
import { Order } from "src/orders/order.entity";

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
    constructor(private readonly configService: ConfigService) {}

    async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
        return {
            type: 'postgres',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [User, Product, Order],
            synchronize: true,
            logging: false,
        };
    }
}
