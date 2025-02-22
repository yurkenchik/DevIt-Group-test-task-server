import {BadRequestException, Injectable} from "@nestjs/common";
import { User } from "src/users/user.entity";
import { UserNotFoundException } from "src/common/exceptions/client/user-not-found.exception";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { v4 as uuid } from "uuid";
import {UserAlreadyExistsException} from "src/common/exceptions/client/user-already-exists.exception";
import {Order} from "src/orders/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        try {
            const userInsertResult: InsertResult = await this.userRepository
                .createQueryBuilder()
                .insert()
                .into(User)
                .values(createUserDto)
                .execute();

            console.log(userInsertResult);
            const insertedUserId = userInsertResult.identifiers[userInsertResult.identifiers.length - 1].id;
            return this.getUserById(insertedUserId);
        } catch (error) {
            if (error.code === "23505") {
                throw new UserAlreadyExistsException();
            }
            throw new BadRequestException(error.message);
        }
    }

    async getUserById(userId: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }
}