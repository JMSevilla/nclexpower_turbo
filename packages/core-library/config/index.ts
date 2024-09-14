import getConfig from "next/config";

const {
  publicRuntimeConfig: { processEnv },
} = getConfig();

export const config = {
  get value() {
    return {
      NODE_ENV: process.env.NODE_ENV,
      API_URL: processEnv.NEXT_PRIVATE_API_URL!,
      LOCAL_API_URL: processEnv.NEXT_PRIVATE_LOCAL_API_URL,
      XAPIKEY: processEnv.NEXT_PRIVATE_XAPI_KEY!,
      SCOOKIE: processEnv.NEXT_PRIVATE_SINGLE_COOKIE!,
      VERCELURL: processEnv.NEXT_PRIVATE_BASE_URL,
      SECRET_KEY: processEnv.NEXT_PRIVATE_SECRET_KEY!,
      BASEAPP: processEnv.NEXT_PRIVATE_BASE_APP!,
      BASEHUB: processEnv.NEXT_PRIVATE_BASE_ROUTE!,
      APPENV: processEnv.NEXT_PRIVATE_ENV!,
      SYSENV: processEnv.NEXT_PRIVATE_SYSENV!,
      LOCALFE: processEnv.NEXT_PRIVATE_LOCALFE,
      STRIPE_URL_JS: processEnv.NEXT_PRIVATE_STRIPE_URL,
      COOKIE_SCRIPT_URL: processEnv.NEXT_PRIVATE_COOKIE_SCRIPT_URL,
      COOKIE_DOMAIN_SCRIPT: processEnv.NEXT_PRIVATE_COOKIE_DOMAIN_SCRIPT,
      ENVIRONMENT_MENU: processEnv.NEXT_PRIVATE_ENV_MENU,
      ACRONYM_APP: processEnv.NEXT_PRIVATE_ACROAPP,
    };
  },
};
