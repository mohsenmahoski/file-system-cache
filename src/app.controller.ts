import { Controller, Delete, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("post/:postId")
  async getPost(@Param("postId") postId: number) {
    const result = await this.appService.getPost(postId);
    return result;
  }

  @Delete("post/:postId")
  async deletePost(@Param("postId") postId: number) {
    const result = await this.appService.deletePost(postId);
    return result;
  }
}
