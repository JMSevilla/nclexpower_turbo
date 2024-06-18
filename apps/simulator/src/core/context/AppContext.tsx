import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SsrData } from '../types/ssrData';
import { hooks, datatypes } from '@repo/core-library';
import { useRouter } from 'next/router';
import { CalcItemSelectResponseItem, ItemSelectTypes } from '@repo/core-library/types';

type AppContextValue = {
  questionaire: SsrData['questionaire'];
  loading?: boolean;
  setLoader: any;
  itemselect: datatypes.CalcItemSelectResponseItem[];
  displayNextItem: boolean;
  setDisplayNextItem: any;
  selectedItem: CalcItemSelectResponseItem[];
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
  const [loader, setLoader] = useState<boolean>(true);
  const [displayNextItem, setDisplayNextItem] = useState<boolean>(false);
  const router = useRouter();
  const isInitialMount = useRef(true);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  /**
   * @author JMSevilla
   * for test purposes `accountId` and `examGroupId` is generically written since we don't have any api to produce that kind of data. (eg., login api)
   */
  const selectQuestionCb = hooks.useApiCallback(async (api, args: ItemSelectTypes) => await api.calc.ItemSelect(args));
  const questionData: ItemSelectTypes = {
    accountId: '8EECB5D9-54C9-445D-91CC-7E137F7C6C3E',
    examGroupId: '1B8235C8-7EAD-43AC-94AD-A2EF06DFE42E',
    shouldDisplayNextItem: displayNextItem,
  };
  // Prevent re-render of selectQuestionCb.execute({ ...questionData }) on initial mount

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      selectQuestionCb.execute({ ...questionData });
    }
  }, [questionData, selectQuestionCb]);

  const selectedItem = useMemo(() => {
    const data = selectQuestionCb.result?.data;

    if (!Array.isArray(data)) {
      console.error('Expected an array for selectQuestionCb.result?.data, but received:', data);
      return [];
    }

    return mapQuestions(data);
  }, [selectQuestionCb.result?.data]);

  const initSelectedQuestion = useCallback(() => {
    selectQuestionCb.execute({ ...questionData });
  }, [questionData, selectQuestionCb]);

  useEffect(() => {
    const handleRouteChange = () => {
      if (router.pathname === '/next-item') {
        setReloadTrigger(prevState => !prevState);
      }
    };

    router.events.on('routeChangeComplete', initSelectedQuestion);
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', initSelectedQuestion);
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [initSelectedQuestion, router]);

  useEffect(() => {
    /**
     * This auto-route is for test purposes only. This should be removed during the web-customer & simulator integration
     */
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
        loading: selectQuestionCb.loading,
        setLoader,
        itemselect: selectedItem,
        setDisplayNextItem,
        displayNextItem,
        selectedItem,
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

function mapQuestions(questions: CalcItemSelectResponseItem[]) {
  if (!Array.isArray(questions)) {
    console.error('Expected an array for questions, but received:', questions);
    return [];
  }

  return questions.map(question => ({
    lNum: question.lNum,
    qId: question.qId,
    hasContainer: question.hasContainer,
    qLNum: question.qLNum,
    question: question.question,
    actionKey: question.actionKey,
    questionType: question.questionType,
    cnCateg: question.cnCateg,
    correct: question.correct,
    choices: question.choices,
  }));
}
