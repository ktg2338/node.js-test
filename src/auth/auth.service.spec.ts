import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let users: { findOneByName: jest.Mock };

  beforeEach(async () => {
    users = { findOneByName: jest.fn() };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: { sign: jest.fn() } },
        { provide: UserService, useValue: users },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('validates a user with hashed password', async () => {
    const password = 'secret';
    const hashed = await bcrypt.hash(password, 10);
    users.findOneByName.mockResolvedValue({ id: 1, name: 'test', password: hashed });

    await expect(service.validateUser('test', password)).resolves.toEqual({ id: 1, name: 'test' });
  });
});
