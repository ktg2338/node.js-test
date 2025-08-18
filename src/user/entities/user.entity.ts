import { Collection, Entity, Enum, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { Role } from '../../auth/role.enum'
import { Post } from '../../post/entities/post.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  name!: string;

  @Property({ hidden: true })
  password!: string;

  @Enum({ items: () => Role, array: true })
  roles: Role[] = [Role.User]; // 기본 역할은 USER

  @OneToMany(() => Post, (post) => post.author)
  posts = new Collection<Post>(this);
}
