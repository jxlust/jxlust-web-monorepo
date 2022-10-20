import JButton from './Button'

function asyncAppendScript(url: string) {
  return new Promise((resolve, reject) => {
    const scriptEl = document.createElement('script');
    scriptEl.setAttribute("src", url);
    document.head.appendChild(scriptEl);
    scriptEl.onload = () => {
      resolve('ok')
    }
    scriptEl.onerror = () => {
      reject(new Error(`${url} load error`))
    }
  })

}

const vueCreateApp = () => {
  const app = (window as any).Vue.createApp(JButton)
  app.mount('#app')
}
export const syncRenderApp = async () => {
  //先加载完成vue 在加载组件umd模块
  if ((window as any).Vue) {
    vueCreateApp()
  } else {
    let urls = ['https://unpkg.com/vue@3.2.41/dist/vue.global.js'];
    let results = [];

    for (let url of urls) {
      try {
        let ret = await asyncAppendScript(url)
        results.push(ret);
      } catch (error) {
        console.error(error)
      }
    }

    if (results.length === urls.length) {
      vueCreateApp()
    }
  }

}