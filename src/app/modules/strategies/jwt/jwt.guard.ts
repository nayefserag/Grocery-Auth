import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    if (err || !user || !user.isActive) {
      throw err || new UnauthorizedException('User account is inactive');
    }
    return user;
  }
}
