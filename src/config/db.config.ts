import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source.config';

export const databaseConfig = TypeOrmModule.forRoot(dataSourceOptions);