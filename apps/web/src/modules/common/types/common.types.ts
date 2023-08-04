export type ApiResponseData<T = unknown> = { data: T | null; message: string };

export type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        payload: M[Key];
        type: Key;
      };
};

export type TokenPayload = {
  exp: number;
  iat: number;
  roomId: string;
  sub: string;
  username: string;
};
