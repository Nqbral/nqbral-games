import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';

import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const callbackURL = `${process.env.API_URL}/auth/google/callback`;

    if (!clientID || !clientSecret || !callbackURL) {
      throw new Error('Google OAuth environment variables are not set.');
    }

    super({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ) {
    const { emails, displayName, id } = profile;
    const email = emails?.[0]?.value;
    return { email, displayName, googleId: id };
  }
}
