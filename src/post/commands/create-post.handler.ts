import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';

import { Post } from '../entities/post.entity';
import { PostCreatedEvent } from '../events/post-created.event';
import { PostService } from '../post.service';
import { CreatePostCommand } from './create-post.command';

@CommandHandler(CreatePostCommand)
export class CreatePostHandler implements ICommandHandler<CreatePostCommand> {
  constructor(
    private readonly postService: PostService,
    private readonly eventBus: EventBus,
  ) {}

  async execute({ dto }: CreatePostCommand): Promise<Post> {
    const post = await this.postService.create(dto);
    this.eventBus.publish(new PostCreatedEvent(post.id));
    return post;
  }
}
