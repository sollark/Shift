import { AsyncLocalStorage } from 'async_hooks';
import UnauthorizedError from '../errors/UnauthorizedError.js';
export const asyncLocalStorage = new AsyncLocalStorage();
export function setUserDataToALS(userData) {
    const store = asyncLocalStorage.getStore();
    if (!store)
        return;
    store.userData = userData;
}
export function setRequestDataToALS(requestData) {
    const store = asyncLocalStorage.getStore();
    if (!store)
        return;
    store.requestData = requestData;
}
// TODO find error
export function getUuidFromALS() {
    const store = asyncLocalStorage.getStore();
    const uuid = store?.userData?.uuid;
    if (!uuid)
        throw new UnauthorizedError('You are not unauthorized');
    return uuid;
}
export function getPublicIdFromALS() {
    const store = asyncLocalStorage.getStore();
    const publicId = store?.requestData?.publicId;
    return publicId ? publicId : null;
}
