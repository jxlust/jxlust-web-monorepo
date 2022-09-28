// 引入mockjs，官方文档： http://mockjs.com/0.1/
import Mock from 'mockjs';

// 设置全局延时，没有延时的话会检测不到数据的变化
Mock.setup({
  timeout: '500',
});

// vite2.0 提供了 glob 模式的模块导入
const modules = import.meta.globEager('./modules/*.ts');
const modulesValues = Object.values(modules);
// key表示每个引入的模块文件路径，如./login.js
console.log('modules:', modules);
console.log('modulesValues:', modulesValues);
modulesValues.map((v) => {
  // 获取组件配置
  console.log('default m:', v.default);
  const arr = v.default;
  for (let i = 0; i < arr.length; i++) {
    const el = arr[i];
    console.log('el:', el);
    // let reg = RegExp(`${import.meta.env.VITE_API_URL}${el.url}`)
    // console.log(reg,11)
    Mock.mock(RegExp(`${import.meta.env.VITE_API_URL}${el.url}.*`), el.methods, el.template);
  }
});

export default Mock;
