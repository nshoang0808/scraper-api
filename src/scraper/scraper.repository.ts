import { Repository } from "typeorm";
import { ScraperEntity } from './scraper.entity'
import { CustomRepository } from '../decorator/typeorm-ex.decorator'

@CustomRepository(ScraperEntity)
export class ScraperRepository extends Repository<ScraperEntity> {}