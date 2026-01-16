import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

const USER = {
  id: '1',
  email: 'admin@example.com',
  password: bcrypt.hashSync('123456', 10),
};

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(email: string, password: string) {
    if (email !== USER.email) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isValid = await bcrypt.compare(password, USER.password);
    if (!isValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = {
      sub: USER.id,
      email: USER.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
