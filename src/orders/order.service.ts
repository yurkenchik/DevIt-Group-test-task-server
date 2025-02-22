import { Injectable } from "@nestjs/common";
import { Order } from "src/orders/order.entity";
import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { NotEnoughStockException } from "src/common/exceptions/client/not-enough-stock.exception";
import { NotEnoughBalanceException } from "src/common/exceptions/client/not-enough-balance.exception";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityManager, Repository } from "typeorm";
import { UserService } from "src/users/user.service";
import { ProductService } from "src/products/product.service";

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        private readonly userService: UserService,
        private readonly productService: ProductService,
        private readonly dataSource: DataSource
    ) {}

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const { userId, productId, quantity } = createOrderDto;

        return this.dataSource.transaction(async (entityManager: EntityManager): Promise<Order> => {
            const user = await this.userService.getUserById(userId);
            const product = await this.productService.getProductById(productId);

            if (product.stock < quantity) {
                throw new NotEnoughStockException();
            }

            const totalPrice = quantity * product.price;
            if (user.balance < totalPrice) {
                throw new NotEnoughBalanceException();
            }

            const order = entityManager.create(Order, { user, product, quantity, totalPrice });

            user.balance -= totalPrice;
            product.stock -= quantity;

            await entityManager.save([user, product, order]);
            return order;
        })
    }

    async getOrdersByUserId(userId: string): Promise<Array<Order>> {
        return this.orderRepository.find({ where: { user: { id: userId } }});
    }
}