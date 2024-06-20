import { AxiosInstance } from "axios";
import { AccessKey, CmsTokens } from "../../types/types";
import { CmsPageResponse } from "../../types/page";
import { CmsGlobals } from "../../types/global";
import { CmsFooter } from "../../types/tenant";
import { MenuItem } from "../../types/menu";
import qs from "query-string";

export class WebApiBackOffice {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) { }
  public tokenInformation() {
    /* get tokenize informations */
    return this.axios.get<CmsTokens>("");
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
}
