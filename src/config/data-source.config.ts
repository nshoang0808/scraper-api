import { DataSource, DataSourceOptions } from "typeorm";
import { env } from './env.config';

export const dataSourceOptions: DataSourceOptions = {
  type: env.DATABASE.CONNECT || 'postgres',
  host: 'host.docker.internal',
  port: env.DATABASE.PORT || 5432,
  username: env.DATABASE.USER || 'dev',
  password: env.DATABASE.PASSWORD || '12345',
  database: env.DATABASE.NAME || 'postgres',
  entities: [__dirname + '/../scraper/*.entity.{js,ts}'],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: true,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
