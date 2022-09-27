import request from "@/http";

/**
 * 获取用户信息
 * @url:http://xxxx/uc/user/detail/mine
 */
export const getUserDetailServer = () =>
  request({
    url: "/uc/user/detail/mine",
    method: "POST",
  });
