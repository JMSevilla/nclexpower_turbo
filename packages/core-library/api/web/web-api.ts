import { AxiosInstance } from "axios";
import { AccountSetupType } from '../../components/blocks/AccountSetupBlock/validation';
import { LoginFormType } from '../../components/blocks/LoginFormBlock/validation';
import { LoginProps } from '../../types/types';
import { LoginResponse } from '../types';

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
  public webLogin(props: LoginProps) {
    try {
      return this.axios.post<LoginResponse>(props.type === 'isWebCustomer' ? '' : "/api/v2/internal/baseInternal/login", {
        username: props.username,
        password: props.password
      })
    }
    catch (err: any) {
      console.error(err)
    }
  }
}
