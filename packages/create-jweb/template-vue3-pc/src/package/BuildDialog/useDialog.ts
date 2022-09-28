import DialogVue from './index.vue';
import { h, render, VNode } from 'vue';

export interface DialogInfo {
  title?: string;
  pTitle?: string;
  text?: string;
  width?: number | string;
  height?: number | string;
}

// type DialogFnc = (config: ConfigInfo) => void;
type CallBackFnc = (data: any) => void;
interface ConfigInfo {
  msg: string;
  type: string | number;
  sure?: CallBackFnc;
  close?: CallBackFnc;
  open?: CallBackFnc;
}
// type DialogProp = (config: ConfigInfo | any) => void;
// type DialogProp = ((config: ConfigInfo | any) => void) & {
//   open: DialogFnc;
// };

const renderDialog = (): VNode => {
  const props: DialogInfo = {
    title: '初始化',
    pTitle: '内容标题',
    text: 'xjxlj记录就是垃圾费',
  };
  //创建虚拟dom
  const dialogVnode = h(DialogVue, props);
  //渲染
  // 将虚拟dom渲染到 container dom 上
  //   const bodyElemnt = document.getElementsByTagName('body')
  render(dialogVnode, document.body);
  // 自己创建一个container
  // 最后将 container 追加到 body 上
  // document.body.appendChild(container);
  return dialogVnode;
};

let dialogIntance: VNode;
//单例模式获取dialog实例
const initDialog = (config: ConfigInfo): void => {
  if (dialogIntance) {
    const component = dialogIntance?.component;
    console.log('component:', component);
    component?.exposed?.openDialog(config);
    // component?.exposed?.open();
  } else {
    dialogIntance = renderDialog();
    // let component = dialogIntance?.component;
    // console.log("component:", component);
    // component?.exposed?.openDialog(config);
    initDialog(config);
  }
};

// const _Dialog = (config: ConfigInfo): any => {
//   initDialog(config);
//   return {
//     open: () => {
//       if (dialogIntance) {
//         let component = dialogIntance?.component;
//         console.log("component:", component);
//         component?.exposed?.open();
//       } else {
//         throw new Error("Not init dialog..");
//       }
//     },
//   };
// };
class MyDialog {
  constructor(config: any) {
    initDialog(config);
  }
  open() {
    if (dialogIntance) {
      const component = dialogIntance?.component;
      console.log('component:', component);
      component?.exposed?.open();
    } else {
      throw new Error('Not init dialog..');
    }
  }
}
// _Dialog.prototype.open = () => {
//   if (dialogIntance) {
//     let component = dialogIntance?.component;
//     console.log("component:", component);
//     component?.exposed?.open();
//   } else {
//     throw new Error("Not init dialog..");
//   }
// };

// const MyDialog: DialogProp = _Dialog;
window.MyDialog = MyDialog;
export default MyDialog;
