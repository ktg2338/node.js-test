// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

export interface JwtPayload {
  sub: number; // 사용자 ID
  username: string; // 사용자 이름
  roles: string; // 사용자 역할 (예: admin, user 등)
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      // Authorization: Bearer <token>  또는 쿠키(access_token)에서 추출
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req?.cookies?.access_token,
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET')!, // .env에서 로드
      algorithms: ['HS256'], // HMAC 기본
    });
  }

    async validate(payload: JwtPayload) {
    // 필요시 DB 조회 등 추가 검증
    // 반환값이 req.user 가 됩니다.
    return {
      id: payload.sub,
      username: payload.username,
      roles: payload.roles, // 역할 정보 추가
    };
  }
}
