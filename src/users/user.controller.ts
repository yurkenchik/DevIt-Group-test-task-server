import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { User } from "src/users/user.entity";
import {Order} from "src/orders/order.entity";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @Get(":id")
    async getUsers(@Param("id") userId: string): Promise<User> {
        return this.userService.getUserById(userId)
    }
}