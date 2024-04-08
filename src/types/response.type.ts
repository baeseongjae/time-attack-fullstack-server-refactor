export type TResponse<T> = {
  success: boolean;
  result: T | null;
  message: string | null;
};
