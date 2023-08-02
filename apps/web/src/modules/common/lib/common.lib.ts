import { TokenPayload } from '../types/common.types';

export const getDataFromToken = (accessToken: string): TokenPayload => JSON.parse(atob(accessToken.split('.')[1]));

export const capitalize = (str: string): string => str.charAt(0).toUpperCase().concat(str.slice(1));
