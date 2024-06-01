import { createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { SsrData } from '../types/ssrData';
import { hooks, datatypes } from '@repo/core-library';
import { useRouter } from 'next/router';

type AppContextValue = {
  questionaire: SsrData['questionaire'];
  loading?: boolean;
  setLoader: any;
  itemselect: datatypes.CalcItemSelectValues[];
};

type Ssr = {
  data?: any;
};

const ApplicationContext = createContext<AppContextValue>(undefined as any);

export const ApplicationProvider: React.FC<React.PropsWithChildren<Ssr>> = ({ children, data }) => {
  /**
   * @deprecated
   * this useState not necessary.
   */
  const [questionaire, setQuestionaire] = useState<SsrData['questionaire']>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<datatypes.CalcItemSelectValues[]>([]);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [loader, setLoader] = useState<boolean>(true);
  const { useApiCallback } = hooks;
  const router = useRouter();
  /**
   * @author JMSevilla
   * for test purposes `accountId` and `examGroupId` is generically written since we don't have any api to produce that kind of data. (eg., login api)
   */
  const itemSelectExec = useApiCallback(
    async api =>
      await api.calc.ItemSelect({
        accountId: '3FA85F64-5717-4562-B3FC-2C963F66AFA6',
        examGroupId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        shouldDisplayNextItem: data.slug[2] ?? false,
      }),
  );

  useEffect(() => {
    // function initSelectedQuestion() {
    //   itemSelectExec
    //     .execute()
    //     .then((res) => setSelectedQuestion(res.data as any));
    // }
    // initSelectedQuestion();
    // const handleRouteChange = () => {
    //   if (router.pathname === "/next-item") {
    //     setReloadTrigger((prevState) => !prevState);
    //   }
    // };
    // router.events.on("routeChangeComplete", initSelectedQuestion);
    // router.events.on("routeChangeComplete", handleRouteChange);
    // return () => {
    //   router.events.off("routeChangeComplete", initSelectedQuestion);
    //   router.events.off("routeChangeComplete", handleRouteChange);
    // };
  }, [reloadTrigger]);

  useEffect(() => {
    /* if data receives slug data `/` then check the session if there is an existing
    session `accountId`, `examGroupId` and `tokenization` if one of this was removed
    the simulator or the entire application should terminated or reset straight back
    to the login. */
    // check this first `accountId`, `examGroupId` and `tokenization`
    if (data?.slug === '/') {
      router.push({
        pathname: '/',
        query: {
          slug: ['B850483A-AC8D-4DAE-02C6-08DC5B07A84C', 'C002B561-66AF-46FC-A4D2-D282D42BD774', 'false'],
        }, // this slug can be improved instead of string it should be array of string
      });
    }
  }, []);
  return (
    <ApplicationContext.Provider
      value={{
        questionaire,
        loading: loader,
        setLoader,
        itemselect: selectedQuestion ?? selectedQuestion,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  if (!ApplicationContext) {
    throw new Error('Application context must used.');
  }
  return useContext(ApplicationContext);
};
