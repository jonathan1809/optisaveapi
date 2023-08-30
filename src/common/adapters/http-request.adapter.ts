import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'
import { HttpAdapter } from "../interfaces/http-adapter.interface";

@Injectable()
export class HttpRequestAdapter implements HttpAdapter {
  private httpRequest: AxiosInstance = axios;

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.httpRequest.get<T>(url)
      return data;
    } catch (error) {
      throw new Error('Error in GET request')
    }
  }
}