import { TokenPayload } from '../types/common.types';

export const getDataFromToken = (accessToken: string): TokenPayload => JSON.parse(atob(accessToken.split('.')[1]));
