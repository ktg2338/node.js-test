import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import { CreatePostCommand } from './commands/create-post.command';
import { CreatePostDto } from './dto/create-post.dto';
import { SearchPostDto } from './dto/search-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';
import { SearchPostsQuery } from './queries/search-posts.query';

@Controller('post')
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto) {
    return this.commandBus.execute(new CreatePostCommand(createPostDto));
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('search')
  search(@Query() query: SearchPostDto) {
    return this.queryBus.execute(new SearchPostsQuery(query));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
