import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { Tag } from '../tag/entities/tag.entity';
import { User } from '../user/entities/user.entity';
import { CreatePostHandler } from './commands/create-post.handler';
import { Post } from './entities/post.entity';
import { PostCreatedHandler } from './events/post-created.handler';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SearchPostsHandler } from './queries/search-posts.handler';

const handlers = [CreatePostHandler, PostCreatedHandler, SearchPostsHandler];

@Module({
  imports: [MikroOrmModule.forFeature([Post, Tag, User]), CqrsModule],
  controllers: [PostController],
  providers: [PostService, ...handlers],
})
export class PostModule {}
