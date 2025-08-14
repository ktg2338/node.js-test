import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [MikroOrmModule.forRoot(), PostModule, TagModule, UserModule],
})
export class AppModule {}
