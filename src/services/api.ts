import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const REQUEST_TIMEOUT = 5000;

export enum APIRoute {
  Guitars = '/guitars',
  GuitarsSearch = '/guitars?name_like=',
  GuitarsWithComments = '/guitars?_embed=comments',
  GuitarWithMinPrice = '/guitars?_order=asc&_sort=price&_start=0&_limit=1',
  GuitarWithMaxPrice = '/guitars?_order=desc&_sort=price&_start=0&_limit=1',
  Comments = '/comments',
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
