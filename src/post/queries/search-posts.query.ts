import { SearchPostDto } from '../dto/search-post.dto';

export class SearchPostsQuery {
  constructor(public readonly dto: SearchPostDto) {}
}
