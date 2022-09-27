import { defineStore } from "pinia";

type appInfo = {
  appEnv: string;
  appLanguage: string;
  appName: string;
  appShotVersion: string;
  appVersion: string;
};
type appStoreType = {
  data?: appInfo
}

export const useAppStore = defineStore("app-info", {
  state: (): appStoreType => ({
    data: undefined
  }),
  getters: {
    getAppInfo(state) {
      return state.data;
    },

  },
  actions: {
    setAppInfo(v: appInfo) {
      this.data = v;
    },
  },
});
