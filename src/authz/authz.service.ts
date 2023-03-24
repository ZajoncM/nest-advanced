import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthzService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService,
  ) {}

  async authenticate(payload: any, token: string | null) {
    let user = await this.userService.findOneByExternalId(payload.sub);
    if (!user) {
      const profile = await this.getUserProfile(token, payload);
      user = await this.userService.create({
        email: profile.data.email,
        externalId: payload.sub,
        name: profile.data.email,
      });
    }

    return user;
  }

  async getUserProfile(token: string | null, payload: any) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return this.httpService.axiosRef.get<{ email: string }>(
      `${payload.iss}userinfo`,
      options,
    );
  }
}
