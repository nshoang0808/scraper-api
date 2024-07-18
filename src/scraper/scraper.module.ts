import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '../decorator/typeorm-ex.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScraperEntity } from './scraper.entity'
import { ScraperRepository } from './scraper.repository'
import { ScraperService } from './scraper.service';
import { ScraperController } from './scraper.controller';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([ScraperRepository]),
    TypeOrmModule.forFeature([ScraperEntity]),
  ],
  providers: [ScraperService],
  exports: [ScraperService],
  controllers: [ScraperController],
})
export class ScraperModule {}
