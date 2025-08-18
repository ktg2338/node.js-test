import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

import { Post } from '../post/entities/post.entity';
import { Tag } from './entities/tag.entity';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports: [MikroOrmModule.forFeature([Tag, Post])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
