import { getCurrentInstance } from "vue";

export const useMessage = () => {
  const { proxy }: any = getCurrentInstance();
  const showElMessage = (options: any) => {
    proxy.$ElMessage(options);
  };

  return {
    showElMessage,
  };
};
