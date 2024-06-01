import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import qs from "qs";

type HttpRequest = (req: AxiosRequestConfig) => void;
type HttpResponse = (res: AxiosResponse) => void;
type HttpError = (error: AxiosError, client: Http) => Promise<any> | void;

export interface HttpMiddlewareOptions {
  onErrorHandler: (err: AxiosError, http: Http) => Promise<any>;
}

export type HttpOptions = {
  onRequest?: HttpRequest;
  onResponse?: HttpResponse;
  onError?: HttpError;
} & AxiosRequestConfig;

export class Http {
  client: AxiosInstance;
  public readonly options: HttpOptions;
  private middlewareOptions?: HttpMiddlewareOptions;

  constructor(options: HttpOptions, middlewareOptions?: HttpMiddlewareOptions) {
    this.options = options;
    this.middlewareOptions = middlewareOptions;
    this.client = axios.create(options);
    this.setupInterceptors();
  }

  public setupMiddlewareOptions(options: HttpMiddlewareOptions) {
    this.middlewareOptions = options;
  }

  public updateHeaders(headers: Record<string, string>) {
    this.client.defaults.headers = {
      ...this.client.defaults.headers,
      ...headers,
    };
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (req) => {
        (typeof window !== "undefined" ? console : console).info(
          `${req.method} ${req.url}${qs.stringify(req.params, {
            arrayFormat: "repeat",
          })}`
        );
        this.options.onRequest?.(req);
        return req;
      },
      (err) => {
        this.options.onError?.(err, this);
        return Promise.reject(err);
      }
    );

    this.client.interceptors.response.use(
      (res) => res,
      (err) => {
        this.options.onError?.(err, this);

        if (!this.middlewareOptions?.onErrorHandler) {
          return Promise.reject(err);
        }

        return this.middlewareOptions?.onErrorHandler(err, this);
      }
    );
  }
}
export default Http;
