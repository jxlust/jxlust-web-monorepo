const targetNodeRef = ref();
const testValue = ref(123);
// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, characterData: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  console.log('mulist:', mutationsList);
  console.log('ob:', observer);
  for (const mutation of mutationsList) {
    if (mutation.type === 'childList') {
      console.log('A child node has been added or removed.');
    } else if (mutation.type === 'attributes') {
      console.log('The ' + mutation.attributeName + ' attribute was modified.');
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

const startObserver = () => {
  // 以上述配置开始观察目标节点
  observer.observe(targetNodeRef.value, config);
};
const startObserverTarget = (target) => {
  // 以上述配置开始观察目标节点
  observer.observe(target, config);
};
const stopObserver = () => {
  // 之后，可停止观察
  observer.disconnect();
};

export default {
  targetNodeRef,
  startObserver,
  stopObserver,
  startObserverTarget,
};
export { targetNodeRef };
export { testValue };
export { startObserverTarget };
