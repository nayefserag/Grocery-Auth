import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryColumn({ name: 'id', type: 'varchar', length: 255 })
  id: string;

  @Column({ name: 'username', type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'first_name', type: 'varchar', length: 255 })
  firstName: string;

  @Column({ name: 'last_name', type: 'varchar', length: 255 })
  lastName: string;

  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 255 })
  phone: string;

  @Column({ name: 'is_Deleted', type: 'varchar', length: 255, nullable: true })
  isDeleted: boolean;

  @Column({ name: 'is_active', type: 'boolean' })
  isActive: boolean;

  @Column({
    name: 'strategy_key',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  strategyKey: string;

  @Column({
    name: 'refresh_token',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  refreshToken: string;

  @Column({ name: 'is_completed', type: 'boolean' })
  isCompleted: boolean;

  @Column({ name: 'provider', type: 'varchar', length: 255, nullable: true })
  provider: string;
}
