import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { PostCreatedEvent } from './post-created.event';

@EventsHandler(PostCreatedEvent)
export class PostCreatedHandler implements IEventHandler<PostCreatedEvent> {
  handle(event: PostCreatedEvent) {
    // Complex side effects could be triggered here
    // For now, we simply log the event
    console.log(`Post created with id ${event.postId}`);
  }
}
