import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { Post } from '../entities/post.entity';
import { PostService } from '../post.service';
import { SearchPostsQuery } from './search-posts.query';

@QueryHandler(SearchPostsQuery)
export class SearchPostsHandler implements IQueryHandler<SearchPostsQuery> {
  constructor(private readonly postService: PostService) {}

  execute({ dto }: SearchPostsQuery): Promise<Post[]> {
    return this.postService.search(dto);
  }
}
