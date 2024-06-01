import { compress } from "compress-json";
import { useCachedCmsGlobals } from "../../../contexts/contentData/useCachedCmsGlobals";
import { useSessionStorage } from "../../../hooks";
import * as apiHooks from "../../../hooks/useApi";
import { renderHook } from "../../common";

jest.mock("../../../hooks/useApi");
jest.mock("../../../hooks/useSessionStorage");
jest.mock("../../../hooks/useCachedAccessKey");
jest.mock("../../../contexts/TenantContext", () => ({
  useTenantContext: () => ({ tenant: null }),
}));

const RESPONSE_DATA = { globals: "globals" };
const GLOBALS_STORAGE = {
  tenantUrl: "tenant",
  contentAccessKey: "contentAccessKey",
  data: compress(RESPONSE_DATA),
};

describe("useCachedCmsGlobals", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("returns initial globals as null and loading as false", () => {
    jest
      .mocked(apiHooks.useContentApiCallback)
      .mockReturnValue({ loading: false } as any);
    jest
      .mocked(useSessionStorage)
      .mockReturnValue([null, jest.fn(), jest.fn()]);

    const { result } = renderHook(() => useCachedCmsGlobals("tenant"));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
