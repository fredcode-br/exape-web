import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('quotes')
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text" })
    description: string;

    @Column({ type: "text" })
    condition: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    value: number;

    @Column({ name: 'insurance_value', type: "decimal", precision: 10, scale: 2 })
    insuranceValue: number;

    @Column({ name: 'installments_number', type: "int" })
    installmentsNumber: number;
    
    @Column({ name: 'installments_value', type: "decimal", precision: 10, scale: 2 })
    installmentsValue: number;

    @ManyToOne(() => User, user => user.quotes)
    user: User;
}