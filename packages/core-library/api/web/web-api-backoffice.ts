import { AxiosInstance } from "axios";
import {
  AccessKey,
  CmsTokens,
  PricingParams,
  ProductParams,
} from "../../types/types";
import { CmsPageResponse } from "../../types/page";
import { CmsGlobals } from "../../types/global";
import { CmsFooter } from "../../types/tenant";
import { MenuItem } from "../../types/menu";
import qs from "query-string";
import { CategoryListResponse } from "../../types/category-response";
import {
  CategoryFormParams,
  CurrenciesResponse,
  PricingListResponse,
  ProductListResponse,
  ProductSetStatusParams,
} from "../types";

export class WebApiBackOffice {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) { }
  public tokenInformation() {
    /* get tokenize informations */
    return this.axios.get<CmsTokens>("");
  }

  public web_internal_selectAll_categories() {
    return this.axios.get<CategoryListResponse[]>(
      `/api/v1/Category/get-categories`
    );
  }
  /* authorized and unauthorized api is not yet present this time.  */
  public async page(
    slug: string,
    tenantUrl: string,
    contentAccessKey?: string
  ) {
    try {
      return await this.axios.get<CmsPageResponse>(
        contentAccessKey
          ? `/api/content-api/api/v2/content/authorized-page` // params stringify not yet build
          : `/api/v2/content/BaseContent/unauthorized-page?${qs.stringify({ pageUrl: slug, tenantUrl })}`,
        { headers: { ENV: "dev2" } }
      );
    } catch (err: any) {
      if (err.response?.status === 404) {
        return { data: null };
      }
      throw err;
    }
  }

  public async globals(tenantUrl: string, contentAccessKey?: string) {
    try {
      return await this.axios.get<CmsGlobals>(
        contentAccessKey
          ? `/api/content-api/api/v2/content/authorized-globals?${qs.stringify({
            contentAccessKey: "",
          })}`
          : `/api/v2/content/BaseContent/unauthorized-globals?${qs.stringify({ tenantUrl })}`,
        { headers: { ENV: "dev2" } }
      );
    } catch (err: any) {
      if (err.response?.status === 404) {
        return { data: null };
      }
      throw err;
    }
  }

  public refreshAccessKey(tenantUrl: string) {
    return this.axios.get<AccessKey>(
      `` //no current refresh access key for content.
    );
  }

  public accessKey(tenantUrl: string) {
    return this.axios.get<AccessKey>(``); //no current access key for content.
  }

  public async footer(tenantUrl: string, contentAccessKey?: string) {
    try {
      return await this.axios.get<CmsFooter>(
        contentAccessKey
          ? `` //no current authorized-footer api
          : `/api/v2/content/BaseContent/unauthorized-footer?${qs.stringify({ tenantUrl })}`,
        { headers: { ENV: "dev2" } }
      );
    } catch (err: any) {
      if (err.response?.status === 404) {
        return { data: null };
      }
      throw err;
    }
  }

  public async menu(tenantUrl: string, contentAccessKey?: string) {
    try {
      return await this.axios.get<MenuItem[]>(
        contentAccessKey
          ? `` //no current authorized-menu api
          : `/api/v2/content/BaseContent/unauthorized-menu?${qs.stringify({ tenantUrl })}`,
        { headers: { ENV: "dev2" } }
      );
    } catch (err: any) {
      if (err.response?.status === 404) {
        return { data: [] };
      }
      throw err;
    }
  }

  public async deleteCategory(categoryId: string) {
    return await this.axios.delete<number>(
      `/api/v1/Category/remove-category?${qs.stringify({ categoryId })}`
    );
  }

  public createCategoryInternal(params: CategoryFormParams) {
    return this.axios.post<number>(
      `/api/v1/Category/create-category-internal`,
      params
    );
  }

  public shouldDoAccountSetup() {
    return this.axios.get<boolean>(
      `/api/v2/internal/baseInternal/check-account-setup`
    );
  }

  public createPricing(params: PricingParams) {
    return this.axios.post<number>(
      `/api/v1/Product/internal-add-pricing`,
      params
    );
  }

  public getAllCurrencies() {
    return this.axios.get<CurrenciesResponse>(
      `/api/v1/Product/internal-currency-list`
    );
  }

  public getAllPricing() {
    return this.axios.get<PricingListResponse[]>(
      `/api/v1/Product/internal-pricing-list`
    );
  }

  public getOrderNumber() {
    return this.axios.get<string>('/api/v1/Order/get-order-number')
  }


  public async createProducts(params: ProductParams) {
    return await this.axios.post<number>(
      `/api/v1/Product/internal-add-products`,
      params
    );
  }

  public async getAllProducts() {
    return await this.axios.get<ProductListResponse[]>(
      `/api/v1/Product/internal-products-list`
    );
  }

  public async setProductStatus(params: ProductSetStatusParams) {
    return await this.axios.put<number>(
      `/api/v1/Product/internal-set-product-status`,
      params
    );
  }
}
