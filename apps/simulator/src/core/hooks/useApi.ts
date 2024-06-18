import { AxiosInstance } from 'axios';
import { useAsync, useAsyncCallback } from 'react-async-hook';
import { Api } from '@/api';
import { CalculationApi } from '../api/calc/calc-api';
import Http, { HttpOptions } from '@repo/core-library/http-client';
import { getItem } from '@repo/core-library/session-storage';
import { config } from '../config';

const HTTP_OPTIONS: HttpOptions = {
  headers: {
    'x-api-key': config.value.XAPIKEY,
    'Content-Type': 'application/json',
    ENV: 'dev2',
  },
  onRequest: req => {
    const accessToken = getItem<string | undefined>('accessToken');
    if (req.headers && accessToken) req.headers.Authorization = `Bearer ${accessToken}`;
  },
  onError: error => {
    const user = getItem<string | undefined>('user');
    console.error(`Error on response: ${JSON.stringify(error)}. User ${JSON.stringify(user)}`);
  },
};

const SELF_HTTP_OPTIONS: HttpOptions = {
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PRIVATE_XAPI_KEY,
    ENV: 'dev2',
  },
  onRequest: req => {
    const accessToken = getItem<string | undefined>('AT');
    if (req.headers && accessToken) req.headers.Authorization = `Bearer ${accessToken}`;
  },
};

export const selfHttpClient = new Http({
  ...SELF_HTTP_OPTIONS,
  baseURL: 'http://localhost:3000',
});
export const httpClient = new Http({
  ...HTTP_OPTIONS,
  baseURL:
    process.env.NODE_ENV === 'development' ? process.env.NEXT_PRIVATE_LOCAL_API_URL : process.env.NEXT_PRIVATE_API_URL,
});
export const mockHttpClient = new Http({
  ...HTTP_OPTIONS,
  baseURL:
    process.env.NODE_ENV === 'development' ? process.env.NEXT_PRIVATE_LOCAL_API_URL : process.env.NEXT_PRIVATE_API_URL,
});
export const httpSsrClient = new Http({
  ...HTTP_OPTIONS,
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : typeof window !== 'undefined'
        ? window.location.origin
        : undefined,
});

export const useApi = <R, D extends unknown[]>(asyncFn: (api: Api) => Promise<R>, deps?: D) => {
  return useAsync(async () => {
    try {
      const api = createApi(httpClient.client, httpSsrClient.client);
      return await asyncFn(api);
    } catch (error: any) {
      throw new Error(error);
    }
  }, [httpClient, ...(deps || [])]);
};

export const useApiCallback = <R, A extends unknown>(asyncFn: (api: Api, args: A) => Promise<R>) => {
  return useAsyncCallback(async (args?: A) => {
    try {
      const api = createApi(httpClient.client, httpSsrClient.client);
      return await asyncFn(api, args as A);
    } catch (error: any) {
      throw new Error(error);
    }
  });
};

function createApi(client: AxiosInstance, httpSsrClient: AxiosInstance) {
  return new Api(new CalculationApi(client, httpSsrClient));
}
