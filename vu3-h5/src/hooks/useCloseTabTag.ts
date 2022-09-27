import { useTagsStore } from "@/stores/tags";

export const useCloseTabTag = (router, route) => {
  const tags = useTagsStore();
  const closeCurrentTag = () => {
    tags.closeCurrentTag({
      $router: router,
      $route: route,
    });
  };

  return closeCurrentTag;
};
