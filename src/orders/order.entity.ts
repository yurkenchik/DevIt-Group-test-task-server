import { User } from "src/users/user.entity";
import { Product } from "src/products/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateDateColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "integer", nullable: false })
    quantity: number;

    @Column({ type: "decimal", nullable: false })
    totalPrice: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    @JoinColumn()
    user!: User;

    @ManyToOne(() => Product)
    @JoinColumn()
    product!: Product;
}