import {Cookies} from 'react-cookie';

interface IToken {
  refreshToken: string;
  refreshTokenExpirationTime: any;
}

class JwtToken {
  private _refreshToken: string;
  private _cookies = new Cookies();

  constructor() {
    this._refreshToken = '';
  }

  get refreshToken(): string {
    return this._cookies.get('refreshToken');
  }

  haveRefreshToken(): boolean {
    return this._cookies.get('refreshToken') !== '';
  }

  deleteToken() {
    this._cookies.remove('refreshToken');
  }

  setToken({refreshToken, refreshTokenExpirationTime}: IToken) {
    this._cookies.set('refreshToken', refreshToken, {
      path: '/',
      sameSite: true,
    });
    this._refreshToken = refreshToken;
  }
}

export const jwtToken = new JwtToken();
