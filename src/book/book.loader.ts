import { Injectable, Scope } from '@nestjs/common';

import * as DataLoader from 'dataloader';
import { UserService } from 'src/user/user.service';

@Injectable({ scope: Scope.REQUEST })
export default class BookLoaders {
  constructor(private userService: UserService) {}

  public readonly batchUsers = new DataLoader(async (userIds: number[]) => {
    const users = await this.userService.getByIds(userIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return userIds.map((authorId) => usersMap.get(authorId));
  });
}
