import { Order } from "src/orders/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", nullable: false })
    name: string;

    @Column({ type: "varchar", nullable: false, unique: true })
    email!: string;

    @Column({ type: "integer", default: 100 })
    balance: number;

    @OneToMany(() => Order, order => order.user)
    orders: Array<Order>;
}
