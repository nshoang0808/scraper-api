import { Controller, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common'
import { ScraperService } from './scraper.service'
import { AuthenticatedGuard } from '../auth/authenticated.guard'

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {}

  @UseGuards(AuthenticatedGuard)
  @Post('parse')
  async scrapeUrls(@Request() req): Promise<any>{
    const urls = String(req.body.urls).split(',')
    let website = ''
    let image: string[] = []
    let video: string[] = []
    for (const url of urls) {
      const data = await this.scraperService.scrapeContent(url)
      const listImage: string[] = data.filter(elem => elem[0] === 'IMG').map(elem => elem[1])
      const listVideo: string[] = data.filter(elem => elem[0] === 'VIDEO').map(elem => elem[1])
      website = website + ',' + url
      image = image.concat(listImage)
      video = video.concat(listVideo)
    }
    return await this.scraperService.create({
      website,
      image,
      video
    })
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getScrapeData(@Param('id') id: number, @Query() params: any) {
    const size = params.size ? parseInt(params.size) : 10
    const page = params.page ? parseInt(params.page) : 1
    const type = params.type ? String(params.type) : 'image'
    const skip= (page-1) * size
    const data = await this.scraperService.findOne(id)
    const result = data[`${type}`].slice(skip, skip+size)
    const total = data[`${type}`].length
    return {
      website: data.website,
      media: result,
      page,
      size,
      total,
    }
  }
}
