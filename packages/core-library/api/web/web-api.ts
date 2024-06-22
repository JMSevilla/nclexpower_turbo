import { AxiosInstance } from "axios";
import { AccountSetupType } from '../../components/blocks/AccountSetupBlock/validation';
import { LoginFormType } from '../../components/blocks/LoginFormBlock/validation';

export class WebApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) { }

  public async createAccount(data: AccountSetupType) {
    try {
      return await this.axios.post('/api/v2/internal/baseInternal/internal-account-creation', data, { headers: { ENV: "dev2" } })
    }
    catch (err: any) {
      if (err.response?.status === 404) {
        return { data: null };
      }
      throw err;
    }
  }
  public async webLogin(username: string, password: string, type: string) {
    try {
      return await this.axios.post(type === 'WebCustomer' ? '' : "/api/v2/internal/baseInternal/login", {
        username: username,
        password: password
      }, { headers: { ENV: "dev2" } })
    }
    catch (err: any) {
      if (err.response?.status === 404) {
        return { data: null };
      }
      throw err;
    }
  }
}
