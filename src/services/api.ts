import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = 'https://accelerator-guitar-shop-api-v1.glitch.me';
const REQUEST_TIMEOUT = 5000;

export enum APIRoute {
  Guitars = '/guitars',
  GuitarsWithComments = '/guitars?_embed=comments',
  Comments = '/comments',
  Coupons = '/coupons',
  Orders = '/orders',
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};
