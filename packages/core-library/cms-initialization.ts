import axios from "axios";
import { config } from "./config";

// export async function initializedCms() {
//   const response = axios.get(`${config.value.MockDB}/questionaire`);
//   return (await response).data ?? null;
// }

// export async function initializedHeader() {
//   const response = axios.get(`${config.value.MockDB}/header`);
//   return (await response).data ?? null;
// }

export async function initializeLoadPTestHimem() {
  const response = axios.get(
    `${config.value.API_URL}/v1/api/baseAppload/processor-load-ptest-himem`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.value.XAPIKEY,
        ENV: "dev2",
      },
    }
  );
  return (await response).data ?? null;
}

export async function initializeLoadPrepareTrackItem() {
  const response = axios.get(
    `${config.value.API_URL}/v1/api/baseAppload/processor-prep-track-item`,
    {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.value.XAPIKEY,
        ENV: "dev2",
      },
    }
  );
  return (await response).data ?? null;
}
