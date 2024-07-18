import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
}

@Injectable()
export class UserService {
  private readonly users: User[] = [
    { id: 1, name: 'Hoang', username: 'hoang', password: '080896' },
    { id: 2, name: 'test1', username: 'testuser', password: 'pass123' },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username)
  }
}
