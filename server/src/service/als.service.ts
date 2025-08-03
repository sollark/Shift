import { AsyncLocalStorage } from "async_hooks";
import UnauthorizedError from "../errors/UnauthorizedError.js";
import { TokenUserData } from "../types/token.js";

export type RequestData = {
  publicId?: string;
};

export type SessionData = {
  userData?: TokenUserData;
  requestData?: RequestData;
};

export const asyncLocalStorage = new AsyncLocalStorage<SessionData>();

export function setUserDataToALS(userData: TokenUserData) {
  const store = asyncLocalStorage.getStore();
  if (!store) return;

  store.userData = userData;
}

export function setRequestDataToALS(requestData: RequestData) {
  const store = asyncLocalStorage.getStore();
  if (!store) return;

  store.requestData = requestData;
}

export function getUuidFromALS() {
  const store = asyncLocalStorage.getStore();
  const uuid = store?.userData?.uuid;
  if (!uuid) throw new UnauthorizedError("You are unauthorized");

  return uuid;
}

export function getPublicIdFromALS() {
  const store = asyncLocalStorage.getStore();
  const publicId = store?.requestData?.publicId;

  return publicId ? publicId : null;
}
