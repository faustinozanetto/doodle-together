import { z } from 'zod';

export const USERNAME_MIN_LENGHT = 3;
export const USERNAME_MAX_LENGHT = 24;

export const usernameValidationSchema = z
  .string({ required_error: 'Username is required!' })
  .min(USERNAME_MIN_LENGHT, `Username min length is ${USERNAME_MIN_LENGHT}!`)
  .max(USERNAME_MAX_LENGHT, `Username max length is ${USERNAME_MAX_LENGHT}!`);

export const userIdValidationSchema = z
  .string({ required_error: 'User ID is required!' })
  .nonempty('User ID must not be empty!');

export const accessTokenValidationSchema = z.string({ required_error: 'Access token is required!' });
