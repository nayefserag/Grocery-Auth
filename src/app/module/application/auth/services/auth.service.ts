import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  comparePassword,
  hashPassword,
} from 'src/app/shared/utils/hash.helper';
import { SignupDto } from '../model/sginup.dto';
import { v4 as uuidv4 } from 'uuid';
import { AuthRepository } from 'src/app/module/infrastructure/repositories/auth/auth.repository';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService
    , private readonly authRepository: AuthRepository
  ) {}

  private users = [];

  async signup(sgingUpDto: SignupDto) {
    const hashedPassword = await hashPassword(sgingUpDto.password);
    const user = { id: uuidv4(), ...sgingUpDto, password: hashedPassword };
    this.users.push(user);
    return { message: 'User registered successfully' };
  }

  async login(username: string, password: string) {
    const user = this.users.find((user) => user.username === username);

    if (!user || !(await comparePassword(password, user.password))) {
      return { message: 'Invalid credentials' };
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
