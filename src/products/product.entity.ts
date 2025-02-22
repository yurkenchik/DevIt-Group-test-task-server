import { Order } from "src/orders/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @Column({ type: "decimal", nullable: false })
    price: number;

    @Column({ type: "integer", nullable: false })
    stock: number;

    @OneToMany(() => Order, order => order.product)
    orders: Array<Order>;
}