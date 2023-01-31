import {Cookies} from 'react-cookie';

interface IToken {
  refreshToken: string;
  refreshTokenExpirationTime: any;
}

class Token {
  private _refreshToken: string;
  private cookies = new Cookies();

  constructor() {
    this._refreshToken = '';
  }

  get refreshToken(): string {
    return this.cookies.get('refreshToken');
  }

  haveRefreshToken(): boolean {
    return this.cookies.get('refreshToken') !== '';
  }

  setToken({refreshToken, refreshTokenExpirationTime}: IToken) {
    this.cookies.set('refreshToken', refreshToken, {
      path: '/',
      sameSite: true,
    });
    this._refreshToken = refreshToken;
  }
}

export const jwtToken = new Token();
