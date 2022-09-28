import { App, Component } from 'vue';
// import 'element-plus/dist/index.css';

// export function setupElementComponent(app: App) {
//   components.forEach((component: Component) => {
//     app.component(component.name!, component);
//   });
// }

import { ElLoading, ElInfiniteScroll } from 'element-plus';
const plugins: Array<Component | any> = [ElLoading, ElInfiniteScroll];

export function setupElementPlus(app: App) {
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
}
