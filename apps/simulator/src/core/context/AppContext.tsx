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
  const { useApiCallback, useApi } = hooks;
  const router = useRouter();
  const isInitialMount = useRef(true);
  const [reloadTrigger, setReloadTrigger] = useState(false);
  /**
   * @author JMSevilla
   * for test purposes `accountId` and `examGroupId` is generically written since we don't have any api to produce that kind of data. (eg., login api)
   */

  const selectQuestionCb = useApiCallback(async (api, args: ItemSelectTypes) => await api.calc.ItemSelect(args));
  const questionData: ItemSelectTypes = {
    accountId: '5A637337-33EC-41AF-A903-4192514B9561',
    examGroupId: '0930C751-AC22-4895-8D76-2EF0B1FC90D9',
    shouldDisplayNextItem: displayNextItem,
  };
  // Prevent re-render of selectQuestionCb.execute({ ...questionData }) on initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      selectQuestionCb.execute({ ...questionData });
    }
  }, [questionData, selectQuestionCb]);

  const selectedItem = useMemo(
    () => mapQuestions(selectQuestionCb.result?.data || []),
    [selectQuestionCb.result?.data],
  );

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

  console.log('selectedItem', selectedItem);
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
