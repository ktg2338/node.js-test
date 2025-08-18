import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Tag } from '../tag/entities/tag.entity';
import { User } from '../user/entities/user.entity';
import { Post } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [MikroOrmModule.forFeature([Post, Tag, User])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
