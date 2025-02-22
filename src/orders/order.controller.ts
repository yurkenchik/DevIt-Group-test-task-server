import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { OrderService } from "src/orders/order.service";
import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { Order } from "src/orders/order.entity";

@Controller("orders")
export class OrderController {
    constructor(
        private readonly orderService: OrderService
    ) {}

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.orderService.createOrder(createOrderDto);
    }

    @Get()
    async getUserOrders(@Query("userId") userId: string): Promise<Array<Order>> {
        return this.orderService.getOrdersByUserId(userId);
    }
}