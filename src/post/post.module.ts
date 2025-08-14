import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { Tag } from '../tag/entities/tag.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Post, Tag, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
