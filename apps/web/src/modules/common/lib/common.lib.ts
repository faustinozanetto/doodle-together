import { TokenPayload } from '../types/common.types';

export const getDataFromToken = (accessToken: string): TokenPayload =>
  JSON.parse(window.atob(accessToken.split('.')[1]));
