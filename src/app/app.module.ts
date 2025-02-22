import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "src/users/user.module";
import { ProductModule } from "src/products/product.module";
import { OrderModule } from "src/orders/order.module";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { DatabaseService } from "src/database/database.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({ useClass: DatabaseService }),
        UserModule,
        ProductModule,
        OrderModule,
        ThrottlerModule.forRoot({ throttlers: [{ limit: 10, ttl: 60000 }] }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard
        }
    ],
})
export class AppModule {}
