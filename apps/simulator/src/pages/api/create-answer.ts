import { withSsrHttpClient } from 'core-library';
import { NextApiHandler } from 'next';
import { RegularAnswer } from 'core-library/types';

const handler: NextApiHandler = withSsrHttpClient(client => async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      message: 'MethodNotAllowedException',
    });
  }

  try {
    const result = await client.post<number>(`/v1/api/BaseCentralized/calc-cumulatives`, req.body as RegularAnswer);
    res.status(result.status).json(result.data);
  } catch (error) {
    console.error(error);
  }
});

export default handler;
