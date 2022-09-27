export const getInitLocale = function () {
  const jsSrc = (window.navigator.language || (<any>window.navigator)?.browserLanguage || "zh-CN").toLowerCase();
  let language = "zh_cn";
  if (["zh-cn", "zh"].includes(jsSrc)) {
    language = "zh_cn";
  } else if (jsSrc.indexOf("zh-") >= 0) {
    language = "zh_tw";
  } else if (jsSrc.indexOf("en") >= 0) {
    language = "en_us";
  }
  return language;
};

export const getOriginLocale = function () {
  const language = (window.navigator.language || (<any>window.navigator).browserLanguage || "zh-CN").toLowerCase();
  let languageKey = "zh-cn";
  if (["zh-cn", "zh"].includes(language)) {
    languageKey = "zh-cn";
  } else if (language.indexOf("zh-") >= 0) {
    languageKey = "zh-tw";
  } else if (language.indexOf("en") >= 0) {
    languageKey = "en-us";
  }
  return languageKey;
};

/**
 * 获取token
 * @param name
 * @returns
 */
export const getLocalToken = (name = "ACCTOKEN") => {
  if (document.cookie) {
    const reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    const arr = document.cookie.match(reg);
    if (arr) {
      return decodeURIComponent(arr[2]);
    }
  } else if (window.cookies) {
    return window.cookies[name];
  }
  return null;
};
