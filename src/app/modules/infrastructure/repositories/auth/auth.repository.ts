import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../entities/general/user.entity';
import { Repository } from 'typeorm';
import { SignupDto } from 'src/app/modules/application/auth/model/signup.dto';
import { OAuthDto } from 'src/app/modules/application/auth/model/o-auth.dto';

@Injectable()
export class AuthRepository {
  private readonly logger = new Logger(AuthRepository.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.logger.log('AuthRepository initialized');
  }

  async createUser(user: SignupDto | OAuthDto): Promise<UserEntity> {
    try {
      this.logger.log(
        `Attempting to create a new user with email: ${user.email}`,
      );
      let entity = this.userRepository.create(user);
      entity = await this.userRepository.save(entity);
      this.logger.log(`User created successfully: ${entity.email}`);
      return entity;
    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async updateUser(user: Partial<UserEntity>): Promise<UserEntity> {
    try {
      this.logger.log(`Attempting to update user with ID: ${user.id}`);
      let entity = await this.userRepository.save(user);
      this.logger.log(`User updated successfully: ${entity.email}`);
      return entity;
    } catch (error) {
      this.logger.error(
        `Failed to update user with ID: ${user.id}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async getUserByFelid(
    field: keyof UserEntity,
    value: any,
  ): Promise<UserEntity | null> {
    try {
      this.logger.log(`Fetching user by ${field}: ${value}`);
      const entity = await this.userRepository.findOne({
        where: { [field]: value },
      });

      if (!entity) {
        this.logger.warn(`No user found with ${field}: ${value}`);
      } else {
        this.logger.log(
          `User fetched successfully by ${field}: ${entity.email}`,
        );
      }

      return entity;
    } catch (error) {
      this.logger.error(`Error fetching user by ${field}: ${error.message}`);
      throw new InternalServerErrorException(
        `Failed to fetch user by ${field}`,
      );
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      this.logger.log(`Attempting to delete user with ID: ${userId}`);
      const result = await this.userRepository.delete(userId);

      if (result.affected === 0) {
        this.logger.warn(`No user found with ID: ${userId}`);
        throw new InternalServerErrorException('User not found');
      }

      this.logger.log(`User deleted successfully with ID: ${userId}`);
    } catch (error) {
      this.logger.error(
        `Failed to delete user with ID: ${userId}, Error: ${error.message}`,
      );
      throw new InternalServerErrorException('Failed to delete user');
    }
  }
}
