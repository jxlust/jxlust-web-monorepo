// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, characterData: true, subtree: true };

export const useMutation = (targetDom: HTMLElement) => {
  // const targetNodeRef = ref();
  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList, observer) {
    console.log("mutationsList:", mutationsList);
    console.log("observer:", observer);
    for (const mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("A child node has been added or removed.");
      } else if (mutation.type === "attributes") {
        console.log("The " + mutation.attributeName + " attribute was modified.");
      }
    }
  };

  // 创建一个观察器实例并传入回调函数
  const observer = new MutationObserver(callback);

  // 以上述配置开始观察目标节点
  const startObserver = () => {
    observer.observe(targetDom, config);
  };

  // 以上述配置开始观察目标节点
  const startObserverTarget = (target) => {
    observer.observe(target, config);
  };

  // 停止观察
  const stopObserver = () => {
    observer.disconnect();
  };

  return {
    startObserver,
    stopObserver,
    startObserverTarget,
  };
};
