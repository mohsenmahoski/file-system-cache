import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("post/:postId")
  async getPost(@Param("postId") postId: number) {
    const post = await this.appService.getPost(postId);
    return post;
  }
}
