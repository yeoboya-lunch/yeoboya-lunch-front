import {Cookies} from 'react-cookie';

interface Token {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpirationTime: any;
}

class AuthToken {
  private _accessToken: string;
  private cookies = new Cookies();

  constructor() {
    this._accessToken = '';
  }

  get refreshToken(): string {
    return this.cookies.get('refreshToken');
  }

  get accessToken(): string {
    return this._accessToken;
  }

  haveAccessToken(): boolean {
    return this._accessToken !== '';
  }

  setToken({accessToken, refreshToken, refreshTokenExpirationTime}: Token) {
    this.cookies.set('refreshToken', refreshToken, {
      path: '/',
      sameSite: true,
    });
    this._accessToken = accessToken;
  }
}

export const authToken = new AuthToken();
