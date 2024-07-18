import { BadRequestException, Injectable } from '@nestjs/common'
import { ScraperRepository } from './scraper.repository'
import { ScraperEntity } from './scraper.entity'
import { CreateScraperDTO } from './dto/createScraper.dto'
import puppeteer from 'puppeteer'

@Injectable()
export class ScraperService {
  public constructor(
    private scraperRepository: ScraperRepository,
  ) {}

  async all(): Promise<ScraperEntity[]> {
    return this.scraperRepository.find();
  }

  /**
   * @param id find scraped media by id
   */
  async findOne(id: number): Promise<ScraperEntity> {
    return this.scraperRepository.findOneBy({ id });
  }

  /**
   * @param dto create db entity including website and its scraped media
   */
  async create(dto: CreateScraperDTO): Promise<ScraperEntity> {
    let article: ScraperEntity = this.scraperRepository.create(dto);
    return this.scraperRepository.save(article);
  }

  async update(id: number, dto: CreateScraperDTO): Promise<ScraperEntity>     {
    const article = await this.findOne(id);
    if (!article) {
      throw new BadRequestException('Article Not Found')
    }

    return this.scraperRepository.save({ ...article, ...dto })
  }

  async delete(id: number): Promise<void> {
    const article = await this.findOne(id);
    if (!article) {
      throw new BadRequestException('Article Not Found')
    }

    this.scraperRepository.delete(id);
  }

  /**
   *
   * @param url website need scraping
   * @returns list of media and its content type
   */
  async scrapeContent(url: string): Promise<any> {
    const browser = await puppeteer.launch({
      ignoreDefaultArgs: ['--disable-extensions'],
      args: ['--no-sandbox'],
      executablePath: '/usr/bin/chromium-browser'
    });
    const page = await browser.newPage();

    try {
      await page.goto(url);
      await page.waitForSelector("img");

      const data = await page.evaluate(() => {
        const elements = document.querySelectorAll("img, video")
        return Array.from(elements).map((element) => [element.tagName, element['src']])
      });
      return data.filter(elem => elem[1] !== "" && elem[1] !== null && elem[1] !== undefined);
    } catch (error) {
      console.error("Error scraping:", error)
    } finally {
      await browser.close();
    }
  }
}
