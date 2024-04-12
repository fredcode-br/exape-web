import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Quote } from "./Quote";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "text" })
    name: string;

    @Column({ type: "text", unique: true })
    email: string;

    @Column({ type: "text" })
    password: string;

    @OneToMany(() => Quote, quote => quote.user)
    quotes: Quote[];
}