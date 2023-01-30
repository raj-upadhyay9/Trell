import { Entity, PrimaryColumn, Column, OneToMany, JoinTable} from "typeorm"
import {Show} from "./Show.js"

@Entity()
export class Person {
    @PrimaryColumn("varchar")
    id: string

    @Column("varchar")
    username: string

    @Column("varchar")
    password: string

    @OneToMany(() => Show, (show) => show.person,{cascade:true})
    shows: Show[]
}