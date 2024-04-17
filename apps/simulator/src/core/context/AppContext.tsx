import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SsrData } from "../types/ssrData";
import { hooks, datatypes } from '@repo/utils'
import { useRouter } from "next/router";

type AppContextValue = {
  questionaire: SsrData["questionaire"];
  loading?: boolean;
  setLoader: any;
  itemselect: datatypes.CalcItemSelectValues[]
};

type Ssr = {
  data?: any;
};

const ApplicationContext = createContext<AppContextValue>(undefined as any);

export const ApplicationProvider: React.FC<React.PropsWithChildren<Ssr>> = ({
  children,
  data,
}) => {
  /**
   * @deprecated
   * this useState not necessary.
   */
  const [questionaire, setQuestionaire] = useState<SsrData["questionaire"]>([]);
  const [loader, setLoader] = useState<boolean>(true);
  const { useApi } = hooks;
  const router = useRouter()
  /**
   * @author JMSevilla
   * for test purposes `accountId` and `examGroupId` is generically written since we don't have any api to produce that kind of data. (eg., login api)
   */
  const execItemSelect = useApi(async (api) => await api.calc.ItemSelect({ accountId: "3FA85F64-5717-4562-B3FC-2C963F66AFA6", examGroupId: "355F6609-B722-4F5C-A240-D5B9705FEA0B"}));
  const itemSelectList = useMemo<datatypes.CalcItemSelectValues[]>(
    () => [
      ...(execItemSelect.result?.data.map<datatypes.CalcItemSelectValues>(item => ({
        lNum: item.lNum,
        qId: item.qId,
        hasContainer: item.hasContainer === 1 ? true : false,
        qLNum: item.qLNum,
        question: item.question,
        questionUI: item.questionUI,
        tabId: item.tabId
      })) || [])
    ],
    [execItemSelect.result?.data]
  )

  useEffect(() => {
    /* if data receives slug data `/` then check the session if there is an existing
    session `accountId`, `examGroupId` and `tokenization` if one of this was removed
    the simulator or the entire application should terminated or reset straight back
    to the login. */
    // check this first `accountId`, `examGroupId` and `tokenization`
    if(data?.slug === '/') {
      router.push({
        pathname: '/',
        query: { slug: ['B850483A-AC8D-4DAE-02C6-08DC5B07A84C', 'C002B561-66AF-46FC-A4D2-D282D42BD774']} // this slug can be improved instead of string it should be array of string
      })
    }
  }, [])
  return (
    <ApplicationContext.Provider
      value={{
        questionaire,
        loading: loader,
        setLoader,
        itemselect: itemSelectList
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  if (!ApplicationContext) {
    throw new Error("Application context must used.");
  }
  return useContext(ApplicationContext);
};
