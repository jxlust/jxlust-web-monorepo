import request from "@/http";
import type { PermissionForm } from "@/types";

/**
 * εε»Ίζι
 * @param data
 * @returns
 */
export const postCreatePermission = (data: PermissionForm) =>
  request<Pick<PermissionForm, "id">>({
    url: "/xxxx/permission/create",
    method: "POST",
    data: { content: data },
  });
