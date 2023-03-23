import { Controller, Delete, Get, OnModuleInit, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { checkCacheDirectoryExistence } from './cache.decorator';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) {}

  @Get("post/:postId")
  async getPost(@Param("postId", ParseIntPipe) postId: number) {
    const result = await this.appService.getPost(postId);
    return result;
  }

  @Delete("post/:postId")
  async deletePost(@Param("postId", ParseIntPipe) postId: number) {
    const result = await this.appService.deletePost(postId);
    return result;
  }

  onModuleInit(){
    checkCacheDirectoryExistence();
  }
}

