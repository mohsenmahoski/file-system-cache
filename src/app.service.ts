import { Injectable } from '@nestjs/common';
import axios from "axios";
import { CreateCacheDecorator, RemoveCacheDecorator } from './cache.decorator';

export interface IPost {
    userId: number;
    id:     number;
    title:  string;
    body:   string;
}

@Injectable()
export class AppService {

  @CreateCacheDecorator
  async getPost(postId: number){
        const resposne = await axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        return resposne.data;
  }

  @RemoveCacheDecorator
  async deletePost(postId: number){
    const resposne = await axios.delete<{}>(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    return resposne.data;
 }
}
