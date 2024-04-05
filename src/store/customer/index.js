import { STATUS } from "@/constants";
import { apis } from "@/services/api";
import { create } from "zustand";

export const useCustomerStore = create((set, get) => ({
  getCustomerAction: async (payload) => {
    set({ getCustomerStatus: STATUS.FETCHING });
    const prevData = get().customerData || [];
    const { data, ok } = await apis.getCustomerApi(payload);
    if (ok) {
      set({ getCustomerStatus: STATUS.SUCCESS, customerData: [...prevData, ...data] });
    } else {
      set({ getCustomerStatus: STATUS.FAILED });
    }
  },

  getImageAction: async (payload) => {
    set({ getImageStatus: STATUS.FETCHING });
    const { data, ok } = await apis.getImageApi(payload);
    if (ok) {
      set({ getImageStatus: STATUS.SUCCESS, imageData: data });
    } else {
      set({ getImageStatus: STATUS.FAILED });
    }
  },
}));
