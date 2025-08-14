// mikro-orm.config.ts
import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

export default defineConfig({
  dbName: 'postgres',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],

  extensions: [Migrator],

  migrations: {
    tableName: 'mikro_orm_migrations',
    path: 'migrations',   // 생성 위치
    pathTs: 'migrations', // TS 사용 시
    emit: 'ts',           // 마이그레이션을 TS로 생성
    glob: '!(*.d).{ts,js}',
  },

  debug: true,
});
