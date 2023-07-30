export type ApiResponseData<T = unknown> = { message: string; data: T | null };

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
  roomId: string;
  username: string;
};
