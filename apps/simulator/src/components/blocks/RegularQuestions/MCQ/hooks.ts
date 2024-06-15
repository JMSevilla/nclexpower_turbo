import { useApplicationContext } from '@/core/context/AppContext';
import { useRouter } from 'next/router';
import { useApiCallback } from '@repo/core-library/hooks';
import { RegularAnswer } from '@repo/core-library/types';
import { useEffect } from 'react';

export const useRegularMCQQuestionnaire = () => {
  const router = useRouter();
  const { setDisplayNextItem, itemselect } = useApplicationContext();
  const throwAnswerCb = useApiCallback(async (api, args: RegularAnswer) => await api.calc.createAnswer(args));

  useEffect(() => {
    if (throwAnswerCb.error) {
      const errors = throwAnswerCb.error as unknown as string[];
      console.log(errors.map(e => e));
    }

    if (!throwAnswerCb.result?.data) {
      return;
    }

    if (throwAnswerCb.result.data === 200) {
      setDisplayNextItem(true);
      router.push({
        pathname: '/next-item',
        query: {
          slug: ['B850483A-AC8D-4DAE-02C6-08DC5B07A84C', 'C002B561-66AF-46FC-A4D2-D282D42BD774'],
        },
      });
    }
  }, [throwAnswerCb.error, throwAnswerCb.result?.data]);

  return {
    throwAnswerCb,
    itemselect,
  };
};
