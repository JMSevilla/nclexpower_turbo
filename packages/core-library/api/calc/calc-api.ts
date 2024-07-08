import {
  AccessKeyType,
  IrtExamLogsResponse,
  LoginResponse,
  ThetaZeroCummResponse,
} from "../types";
import { AxiosInstance } from "axios";
import {
  ItemSelectTypes,
  ItemSessionTypes,
  RegularAnswer,
  CalcItemSelectResponseItem,
} from "../../types";
import qs from "query-string";

export class CalculationApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) {}
  public ItemSelect(props: ItemSelectTypes) {
    const { accountId, examGroupId, shouldDisplayNextItem } = props;
    return this.axios.get<CalcItemSelectResponseItem[]>(
      `/v1/api/baseAppload/item-select-regular/${accountId}/${examGroupId}/${shouldDisplayNextItem}`
    );
  }
  public ItemSelectSession(props: ItemSessionTypes) {
    const { accountId, SessionItem } = props;
    return this.axios.get<string>(
      `/v1/api/baseAppload/item-select-session/${SessionItem}/${accountId}`
    );
  }
  public DisplayNextItemSelection(accountId: string) {
    return this.axios.get<CalcItemSelectResponseItem[]>(
      `/v1/api/baseAppload/display-next-item/${accountId}`
    );
  }
  public createAnswer(props: RegularAnswer) {
    return this.axios.post<number>(
      "/v1/api/BaseCentralized/calc-cumulatives",
      props
    );
  }

  public initializeLoadPTestHimem() {
    return this.axios.get<number>(
      "/v1/api/baseAppload/processor-load-ptest-himem"
    );
  }

  public initializeLoadPrepareTrackItem() {
    return this.axios.get<number>(
      "/v1/api/baseAppload/processor-prep-track-item"
    );
  }
  public getIrtExamlogs(accountId: string) {
    return this.axios.get<IrtExamLogsResponse[]>(
      `/v1/api/baseAppload/select-irt-exam-logs?${qs.stringify({ accountId })}`
    );
  }

  public getIrtZeroCalc(accountId: string) {
    return this.axios.get<ThetaZeroCummResponse[]>(
      `/v1/api/baseAppload/select-irt-zero-calc?${qs.stringify({ accountId })}`
    );
  }

  public async deleteAllCalc(accountId: string) {
    return await this.axios.delete<number>(
      `/v1/api/baseAppload/test-delete-all-calc-by-id/${accountId}`
    );
  }
}
