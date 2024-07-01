import { nonce } from 'core-library/types/business/nonce';

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

type MyDocumentProps = {
  generatedNonce: string;
};

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const generatedNonce = nonce();
    const isDevelopment = process.env.NODE_ENV === 'development';

    const csp = '';

    const res = ctx?.res;
    if (res != null && !isDevelopment && !res.headersSent) {
      res.setHeader('Content-Security-Policy', csp);
    }
    return {
      ...initialProps,
      generatedNonce,
    };
  }

  render() {
    const { generatedNonce } = this.props;
    return (
      <Html lang="en">
        <Head nonce={generatedNonce}>
          <meta charSet="utf-8" />
          <meta name="csp-nonce" content={generatedNonce} />
        </Head>
        <body>
          <Main />
          <NextScript nonce={generatedNonce} />
        </body>
      </Html>
    );
  }
}
