import { Migration } from '@mikro-orm/migrations';

export class Migration20250814020257 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "tag" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "name" varchar(255) not null);`);

    this.addSql(`create table "post" ("id" serial primary key, "title" varchar(255) not null, "author_id" int not null);`);

    this.addSql(`create table "post_tags" ("post_id" int not null, "tag_id" int not null, constraint "post_tags_pkey" primary key ("post_id", "tag_id"));`);

    this.addSql(`alter table "post" add constraint "post_author_id_foreign" foreign key ("author_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "post_tags" add constraint "post_tags_post_id_foreign" foreign key ("post_id") references "post" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "post_tags" add constraint "post_tags_tag_id_foreign" foreign key ("tag_id") references "tag" ("id") on update cascade on delete cascade;`);
  }

}
