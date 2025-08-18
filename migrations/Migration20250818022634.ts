import { Migration } from '@mikro-orm/migrations';

export class Migration20250818022634 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "user" add column "roles" text[] not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop column "roles";`);
  }

}
