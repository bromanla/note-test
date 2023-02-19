/* Unbinds fields from a type */
export type Unbind<T> = {
  [K in keyof T]: T[K];
};
