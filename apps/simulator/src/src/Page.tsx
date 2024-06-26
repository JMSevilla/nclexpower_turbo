import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import { cmsInit } from '@repo/core-library';
import { Layout as LayoutComponent } from './Layout';
import { ApplicationProvider } from '@/core/context/AppContext';
import { ErrorBox } from '@repo/core-library/components';

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
  console.log('data', data);
  return (
    <ApplicationProvider data={data}>
      <Layout questionaire={data?.prefetchQ} data={data} />
    </ApplicationProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query, resolvedUrl }) => {
  const querySlugs = query['slug'];
  try {
    const slug = (querySlugs as string[]) || resolvedUrl;

    return {
      props: {
        data: {
          slug,
        },
      },
    };
  } catch (error) {
    return { props: { error } };
  }
};
