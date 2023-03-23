import { Injectable } from '@nestjs/common';
import axios from "axios";

export interface IPost {
    userId: number;
    id:     number;
    title:  string;
    body:   string;
}

@Injectable()
export class AppService {
  async getPost(id: number){
        const resposne = await axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return resposne.data;
  }
}
