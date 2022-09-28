import { App } from "vue";
import { setupMyPlugin } from "./myPlugin";
import { setCordova } from "./setCordova";
import { setupVant } from "./vant";
export const setupAllPlugins = (app: App) => {
  const envMode = import.meta.env.MODE;
  if (envMode !== "development") {
    setCordova();
  }
  setupMyPlugin(app);
  setupVant(app);
};
