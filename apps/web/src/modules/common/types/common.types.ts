export type ApiResponseData<T = unknown> = { success: boolean; message: string } | { success: boolean; data: T };

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
