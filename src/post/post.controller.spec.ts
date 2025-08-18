import { EntityManager } from '@mikro-orm/postgresql';
import { CqrsModule } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';

import { CreatePostHandler } from './commands/create-post.handler';
import { PostCreatedHandler } from './events/post-created.handler';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SearchPostsHandler } from './queries/search-posts.handler';

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [PostController],
      providers: [
        PostService,
        { provide: EntityManager, useValue: {} },
        CreatePostHandler,
        PostCreatedHandler,
        SearchPostsHandler,
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
