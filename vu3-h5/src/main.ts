import { createApp } from "vue";

import App from "./App";
import router from "./router";
import { setupAllPlugins } from "./plugins";
import { setupStore } from "./stores";
import { useAppStore } from './stores/appStore';
import { ipadAddClass, getNativeAppInfo } from "./utils";
import "@/styles/scss/main.scss";

const envMode = import.meta.env.MODE;
console.log("vite import meta:", envMode);

const app = createApp(App);
setupAllPlugins(app);

//setup pinia store
setupStore(app);

//ipad fixed
ipadAddClass();

//mock模拟接口数据 import()函数支持动态加载模块和按条件导入
// envMode === 'development' && import('./mock');

//vconsole 动态导入控制
if (["sit", "development"].includes(envMode)) {
  import("vconsole").then((module) => {
    const vconsole = module.default;
    new vconsole();
  });
}

const appStore = useAppStore();
const { setAppInfo } = appStore;

if (["development"].includes(envMode)) {
  app.use(router).mount("#app");
} else {
  // 生产环境需要确保cordova加载完成
  document.addEventListener(
    "deviceready",
    () => {
      app.use(router).mount("#app");

      getNativeAppInfo().then((data: any) => {
        setAppInfo(data);
      }).catch(e => {
        console.error('get app info error:', e)
      })

    },
    false,
  );
}
