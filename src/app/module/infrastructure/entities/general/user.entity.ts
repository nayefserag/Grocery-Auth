import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryColumn({name: 'id' ,type: 'varchar', length: 255})
    id: string;

    @Column({name: 'username' ,type: 'varchar', length: 255})
    username: string;

    @Column({name: 'password' ,type: 'varchar', length: 255})
    password: string;

    @Column({name: 'first_name' ,type: 'varchar', length: 255})
    firstName: string;

    @Column({name: 'last_name',type: 'varchar', length: 255})
    lastName: string;

    @Column({name: 'email',type: 'varchar', length: 255})
    email: string;

    @Column({name: 'phone',type: 'varchar', length: 255})
    phone: string;

}