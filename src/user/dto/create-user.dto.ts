import { IsString } from 'class-validator';
import { Role } from '../../auth/role.enum'; // 역할 enum을 가져옵니다.

export class CreateUserDto {
  @IsString()
  name!: string;
  @IsString()
  password!: string;
  @IsString({ each: true })
  roles: Role[] = []; // 역할은 배열로 받음, 기본값은 빈
}
