import { AxiosInstance } from "axios";
import { ItemSelectTypes } from "../../types";
import { CalcItemSelectResponseItem } from "../../types/calc-types/calc-types-responses";

export class CalculationApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) {}
  public ItemSelect(props: ItemSelectTypes) {
    const { accountId, examGroupId, shouldPresentNextItem } = props;
    return this.axios.get<CalcItemSelectResponseItem[]>(
      `/baseAppload/item-select-regular/${accountId}/${examGroupId}/has-next-item/${shouldPresentNextItem}`
    );
  }
}
