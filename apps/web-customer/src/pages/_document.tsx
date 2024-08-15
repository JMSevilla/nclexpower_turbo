import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { nonce } from "core-library/types";
import { config } from "core-library/config";

type MyDocumentProps = {
  generatedNonce: string;
};

export default class MyDocument extends Document<MyDocumentProps> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const generatedNonce = nonce();
    const isDevelopment = process.env.NODE_ENV === "development";

    const csp =
      `default-src 'self' *.vercel.app; script-src 'self' 'nonce-${generatedNonce}' *.vercel.app *.herokuapp.com ` +
      `; form-action 'self'; base-uri 'self'; object-src 'self'; style-src 'self' 'unsafe-inline'; connect-src ` +
      config.value.API_URL +
      " " +
      config.value.VERCELURL +
      " *.vercel.app *.herokuapp.com " +
      `blob:; img-src 'self' data:; font-src 'self' data:; frame-src 'self' *.vercel.app;`;
    const res = ctx?.res;
    if (res != null && !isDevelopment && !res.headersSent) {
      res.setHeader("Content-Security-Policy", csp);
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
