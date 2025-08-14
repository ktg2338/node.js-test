import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { Tag } from './entities/tag.entity';
import { Post } from '../post/entities/post.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Tag, Post])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
