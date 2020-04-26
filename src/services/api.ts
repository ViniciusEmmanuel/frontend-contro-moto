import axios, { AxiosInstance } from 'axios';

class Api {
  private api = axios;

  private url: string;

  private token: string;

  constructor() {
    this.create();
  }

  private getUrl(): void {
    if (process.env.NODE_ENV === 'production') {
      this.url = 'http://api-controle-moto.atwebpages.com/api';
    }

    this.url = 'http://localhost:8000/api';
  }

  private getToken(): string {
    this.token = localStorage.getItem('@rwr/token');

    if (this.token) {
      return `Bearer ${JSON.parse(this.token)}`;
    }

    return '';
  }

  public create(): AxiosInstance {
    this.getUrl();

    return this.api.create({
      baseURL: this.url,
      headers: {
        Authorization: this.getToken(),
      },
    });
  }
}

export default new Api().create();
