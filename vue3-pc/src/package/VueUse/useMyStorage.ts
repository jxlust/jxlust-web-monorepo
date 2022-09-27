import { useLocalStorage } from '@vueuse/core';

const store: any = useLocalStorage('my-storage', {});

export const useMyStorage = () => {
  const setLocal = (obj) => {
    store.value = obj;
  };
  const initLocal = () => {
    store.value = {
      name: 'Apple',
      color: 'red',
    };
  };
  initLocal();
  return {
    store,
    setLocal,
  };
};
