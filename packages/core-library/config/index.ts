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
      BASEAPP: processEnv.NEXT_PRIVATE_BASE_APP!,
      BASEHUB: processEnv.NEXT_PRIVATE_BASE_ROUTE!,
    };
  },
};
