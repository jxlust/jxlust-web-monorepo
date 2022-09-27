import { defineStore } from "pinia";
import type { UserInfo } from "@/types";

type StateData = {
  data: UserInfo | null;
  token: string;
};
export const useUserStore = defineStore("user", {
  state: (): StateData => ({
    data: null,
    token: "",
  }),
  getters: {
    getUserInfo(state) {
      return state.data;
    },
    getToken(state) {
      return state.token;
    },
  },
  actions: {
    setUserInfo(v: UserInfo) {
      this.data = v;
    },
    setUserToken(token: string) {
      this.token = token;
    },
  },
});
