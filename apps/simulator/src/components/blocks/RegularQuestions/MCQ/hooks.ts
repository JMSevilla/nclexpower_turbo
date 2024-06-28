import { useApplicationContext } from '@/core/context/AppContext';
import { useRouter } from 'next/router';
import { useApiCallback } from '@repo/core-library/hooks';
import { RegularAnswer } from '@repo/core-library/types';
import { useEffect } from 'react';
import { useBusinessQueryContext } from '@repo/core-library/contexts';

export const useRegularMCQQuestionnaire = () => {
  const router = useRouter();
  const { setDisplayNextItem, itemselect } = useApplicationContext();
  const { businessQuerySubmissionAnswer } = useBusinessQueryContext();
  const { mutateAsync: submitAnswerAsync, data: result } = businessQuerySubmissionAnswer();

  useEffect(() => {
    if (!result?.data) {
      return;
    }

    if (result.data === 200) {
      setDisplayNextItem(true);
      router.push({
        pathname: '/next-item',
        query: {
          slug: ['B850483A-AC8D-4DAE-02C6-08DC5B07A84C', 'C002B561-66AF-46FC-A4D2-D282D42BD774'],
        },
      });
    }
  }, [result?.data]);

  return {
    submitAnswerAsync,
    itemselect,
  };
};
