import { URIS, apiClient, imageClient } from ".";

export const apis = {
  getCustomerApi: (payload) => apiClient.get(URIS.GET_CUSTOMERS, payload),
  getImageApi: (payload) => imageClient.get(URIS.GET_PHOTOS, payload),
};
