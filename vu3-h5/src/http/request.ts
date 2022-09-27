import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";
import { Toast } from "vant";

import { getOriginLocale } from "@/utils";
import { BaseResponse } from "@/types";
import { useUserStore } from "@/stores/userStore";

// import router from "@/router/index";
import { ContentTypeEnum } from "./httpEnum";

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

// create an axios instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000, // request timeout
  headers: {
    // userId: sessionStorage.getItem("userId") || 0
    "accept-language": getOriginLocale(),
    "X-Requested-With": "XMLHttpRequest", // 标记ajax请求
    // "x-company-id": sessionStorage.getItem("companyId") || 0
  },
});
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideLoading?: boolean;
}

let loadingInstance;

// request拦截器 request interceptor
service.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // 不传递默认关闭loading
    if (config.hideLoading) {
      // loading
      loadingInstance = Toast.loading({
        message: "加载中...",
        duration: 0,
      });
    }
    const userStore = useUserStore();
    const { token: userToken } = userStore;

    if (userToken && config.headers) {
      config.headers["token"] = userToken;
    } else {
      //取消掉请求
      // source.cancel();
      // 无权限
      // router.replace("/xx");
    }

    const contentType = config.headers?.["content-type"] || config.headers?.["Content-Type"];
    const data = config.data;
    if (config.method?.toLocaleUpperCase() == "POST" && data) {
      if (ContentTypeEnum.FORM_DATA == contentType) {
        const fd = new FormData();
        Object.keys(data).forEach((key) => fd.append(key, data[key]));
        config.data = fd;
      } else if (ContentTypeEnum.FORM_URLENCODED == contentType) {
        config.data = qs.stringify(config.data);
      }
    }
    return config;
  },
  (error) => {
    // do something with request error
    // console.error("req error:", error); // for debug
    return Promise.reject(error);
  },
);
// respone拦截器
service.interceptors.response.use(
  (response) => {
    loadingInstance && loadingInstance.clear();
    const res = response.data;
    if (res.code && res.code !== 200) {
      //TODO 判断一些错误码
      let tipsMessage = "服务器访问出错了";
      tipsMessage = res.userMsg || tipsMessage;

      // Toast(tipsMessage);
      Toast.fail(tipsMessage);

      return Promise.reject(res || "error");
    } else {
      return Promise.resolve(response.data);
    }
  },
  (error) => {
    loadingInstance && loadingInstance.clear();
    if (error?.code !== "ERR_CANCELED") {
      if (error.message?.includes("timeout")) {
        Toast.fail("请求超时");
      } else {
        Toast.fail(error.message);
      }
    }
    return Promise.reject(error);
  },
);

const request = <T = any>(config: CustomAxiosRequestConfig): Promise<BaseResponse<T>> => {
  // config.cancelToken = source.token;
  return new Promise((resolve, reject) => {
    service
      .request<T, BaseResponse<T>>(config)
      .then((resData) => {
        //业务逻辑接口的异常状态码处理
        if (resData.code === 200) {
          resolve(resData);
        } else {
          Toast.fail(resData.userMsg || "接口请求错误，请稍后再试");
          reject(resData);
        }
      })
      .catch((err) => reject(err));
  });
};

export default request;
