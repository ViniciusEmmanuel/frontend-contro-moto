import axios, { AxiosInstance } from 'axios';

class Api {
  private api: AxiosInstance;

  private url: string;

  constructor() {
    this.create();
  }

  private create(): void {
    this.getUrl();

    this.api = axios.create({
      baseURL: this.url,
      responseType: 'json',
    });
  }

  private getUrl(): void {
    if (process.env.NODE_ENV === 'production') {
      this.url = 'https://app-controle-moto.herokuapp.com/api';
      return;
    }

    this.url = 'http://localhost:8000/api';
  }

  public request(): AxiosInstance {
    const token = localStorage.getItem('@rwr/token');

    this.api.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(
      token
    )}`;

    return this.api;
  }
}

export default new Api().request();
