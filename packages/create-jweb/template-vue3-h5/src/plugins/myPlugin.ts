import type { App } from "vue";
interface OptionsInterface<T> {
  data: T;
}
type MsgType = {
  msg?: string;
};

const pluginOptions: OptionsInterface<MsgType> = {
  data: {
    msg: "hello!",
  },
};

const myPlugin = {
  install(app: App, options: OptionsInterface<MsgType>) {
    app.config.globalProperties.$translate = (key: string) => {
      const objKeyArray = key.split("."); // a.b.c
      //对options 对象解析 是否能访问到对应的值😌
      // return objKeyArray.reduce((origin, cur) => {
      //   if (origin) {
      //     return origin[cur];
      //   }
      // }, options);
      return objKeyArray.reduce((origin, cur) => origin && origin[cur], options);
    };
    app.config.globalProperties.$translateByOrgin = (key: string, orginObj: any) => {
      const objKeyArray = key.split("."); // a.b.c
      return objKeyArray.reduce((origin, cur) => origin && origin[cur], orginObj);
    };

    app.provide("pluginData", options);

    // app.directive('my-directive', {
    //   mounted(el, binding, vnode, oldVnode) {
    //     // some logic ...
    //   },
    // });
  },
};

export const setupMyPlugin = (app: App) => {
  app.use(myPlugin, pluginOptions);
};
