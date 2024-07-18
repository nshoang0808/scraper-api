import { Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common'
import { AppService } from './app.service'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { AuthenticatedGuard } from './auth/authenticated.guard'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * @param req login api to get access to scraping
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any{
    return { msg: 'Logged in!' }
  }
}
