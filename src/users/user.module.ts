import { Module } from "@nestjs/common";
import { User } from "src/users/user.entity";
import { UserController } from "src/users/user.controller";
import { UserService } from "src/users/user.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UserService]
})
export class UserModule {}