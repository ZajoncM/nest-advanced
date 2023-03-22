import { Injectable, Scope } from '@nestjs/common';

import * as DataLoader from 'dataloader';
import { UserService } from 'src/user/user.service';

@Injectable({ scope: Scope.REQUEST })
export default class BookLoaders {
  constructor(private userService: UserService) {}

  public readonly batchUsers = new DataLoader(async (authorIds: number[]) => {
    const users = await this.userService.getByIds(authorIds);
    const usersMap = new Map(users.map((user) => [user.id, user]));
    return authorIds.map((authorId) => usersMap.get(authorId));
  });
}
