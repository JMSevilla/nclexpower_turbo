import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { cmsInit } from '@repo/core-library';
import { Layout as LayoutComponent } from './Layout';
import { ApplicationProvider } from '@/core/context/AppContext';
import { ErrorBox } from '@repo/core-library/components';
import { BusinessQueryContextProvider } from '@repo/core-library/contexts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
interface Props {
  data?: any;
  error?: any;
}

export const Page: NextPage<Props> = ({ data, error }) => {
  if (error) {
    return <ErrorBox label={`An error occured: ${error?.message || 'Error'}`} />;
  }

  if (!data) {
    return <ErrorBox label={`Client error, Please try again later`} />;
  }

  const Layout = dynamic<React.ComponentProps<typeof LayoutComponent>>(() => import('./Layout').then(c => c.Layout), {
    ssr: false,
  });
  console.log('slug', data);
  const queryClient = new QueryClient({});

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      <BusinessQueryContextProvider>
        <ApplicationProvider data={data}>
          <Layout questionaire={data?.prefetchQ} data={data} />
        </ApplicationProvider>
      </BusinessQueryContextProvider>
    </QueryClientProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, resolvedUrl }) => {
  const querySlugs = query['slug'];
  try {
    const slug = (querySlugs as string[]) || resolvedUrl;
    let slugs: string[];

    if (Array.isArray(querySlugs)) {
      slugs = querySlugs as string[];
    } else if (typeof querySlugs === 'string') {
      slugs = [querySlugs];
    } else {
      slugs = []; // Default value or error handling if needed
    }
    return {
      props: {
        data: {
          slug: slugs,
        },
      },
    };
  } catch (error) {
    return { props: { error } };
  }
};
