import { reactive } from "vue";
export const usePager = (updateData: Function) => {
  const pagerState = reactive({
    total: 0,
    pageSize: 30,
    current: 1,
  });

  watch(
    () => {
      return pagerState.current;
    },
    (newV: any) => {
      console.log("pager current:", newV, pagerState.current);
      updateData();
    },
  );

  watch(
    () => {
      return pagerState.pageSize;
    },
    (newV: any) => {
      console.log("pager pageSize:", newV, pagerState.pageSize);
      updateData();
    },
  );

  return {
    pagerState,
  };
};
