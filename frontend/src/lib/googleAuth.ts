import { jwtDecode } from 'jwt-decode';

export interface GoogleUser {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export const decodeGoogleToken = (token: string): GoogleUser => {
  return jwtDecode<GoogleUser>(token);
};
