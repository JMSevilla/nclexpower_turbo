import { AxiosInstance } from "axios";
import { ItemSelectTypes, ItemSessionTypes, RegularAnswer } from "../../types";
import { CalcItemSelectResponseItem } from "../../types/calc-types/calc-types-responses";

export class CalculationApi {
  constructor(
    private readonly axios: AxiosInstance,
    private readonly ssrAxios: AxiosInstance
  ) {}
  public ItemSelect(props: ItemSelectTypes) {
    const { accountId, examGroupId, shouldDisplayNextItem } = props;
    return this.axios.get<CalcItemSelectResponseItem[]>(
      `/baseAppload/item-select-regular/${accountId}/${examGroupId}/${shouldDisplayNextItem}`
    );
  }
  public ItemSelectSession(props: ItemSessionTypes) {
    const { accountId, SessionItem } = props;
    return this.axios.get<string>(
      `/baseAppload/item-select-session/${SessionItem}/${accountId}`
    );
  }
  public DisplayNextItemSelection(accountId: string) {
    return this.axios.get<CalcItemSelectResponseItem[]>(
      `/baseAppload/display-next-item/${accountId}`
    );
  }
  public createAnswer(props: RegularAnswer) {
    return this.axios.post<number>("/BaseCentralized/calc-cumulatives", props);
  }

  public initializeLoadPTestHimem() {
    return this.axios.get<number>("/baseAppload/processor-load-ptest-himem");
  }

  public initializeLoadPrepareTrackItem() {
    return this.axios.get<number>("/baseAppload/processor-prep-track-item");
  }
}
