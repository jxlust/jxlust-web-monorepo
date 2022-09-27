import request from "@/http";
import type { PermissionForm } from "@/types";

/**
 * 创建权限
 * @param data
 * @returns
 */
export const postCreatePermission = (data: PermissionForm) =>
  request<Pick<PermissionForm, "id">>({
    url: "/xxxx/permission/create",
    method: "POST",
    data: { content: data },
  });
