import axios from "axios";
import { config } from "./config";

export async function initializedCms() {
  const response = axios.get(`${config.value.MockDB}/questionaire`);
  return (await response).data ?? null;
}

export async function initializedHeader() {
  const response = axios.get(`${config.value.MockDB}/header`);
  return (await response).data ?? null;
}
