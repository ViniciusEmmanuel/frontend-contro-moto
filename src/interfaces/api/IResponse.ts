export interface Iresposnse<T> {
  status: number;
  data?: {
    data: T;
    message: string;
  };
}
