import JButton from './Button'
import { App, createApp } from "vue";

// 按需引入
export { JButton }

const component = [JButton]


const vueCreateApp = () => {
  const app = createApp(JButton)
  app.mount('#app')
}
export const syncRenderApp = async () => {
  vueCreateApp();
}

const JXLP = {
  install(app: App) {
    component.forEach((item) => {
      app.component(item.name, JButton)
    })
  },
}
export type { ButtonPropsType } from './Button'
export default JXLP


