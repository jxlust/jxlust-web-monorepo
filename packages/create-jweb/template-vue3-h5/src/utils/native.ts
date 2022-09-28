import md5 from "md5";

const AppPictureUrl =
  "https://cdn-fusionwork.sf-express.com/v1.2/AUTH_FS-BASE-SERVER-PRD-DR/sfosspublic001/mics/2021/12/31/bc1fe6020825f57f25578eed4aeb9182.png";

const ShareIcon = "http://fusionwork.sf-express.com/entrance_icon/icon_drawer_share.png";

/**
 * 获取app信息
 * @returns
 */
export const getNativeAppInfo = () => {
  return new Promise((resolve, reject) => {
    const params = {
      callback: (res) => {
        if (res.errcode == 0) {
          resolve(res.data);
        } else {
          // 失败
          console.error(res.errmsg);
          reject(res.errmsg);
        }
      },
    };
    window.SFNativeApp && window.SFNativeApp.getAppInfo(params);
  });
};

// interface Window{
//     ExpressPlugin: any;
// }
interface ShareInfo {
  url: string;
  content: string;
  title: string;
  pageType: string;
  isShare: boolean;
}

/**
 * 跳用户信息
 * @param account  待跳转人工号
 */
export const openPersonHome = (account: string) => {
  window.ExpressPlugin && window.ExpressPlugin.openContactDetail(account);
};

/**
 * 获取当前用户工号
 */
export const getAccount = () => {
  return new Promise((resolve, reject) => {
    const envMode = import.meta.env.MODE;
    console.log("env:", envMode);

    if (envMode === "development") {
      resolve("01421684");
      return;
    }
    function success(workId: any) {
      console.log("当前登录人工号", workId);
      resolve(workId);
    }
    function failed() {
      console.log("工号获取失败");
      reject("error");
    }
    window.ExpressPlugin.getUserWorkId(success, failed);
  });
};
/**
 * 关闭当前应用
 */
export const closeApp = () => {
  window.ExpressPlugin.backToWidget();
};

export const getUserHeadImage = (account: string) => {
  const key = account + "*&^SFIMIMAGE^&*1" + account;
  const baseUrl = "http://srs.sit.sf-express.com/fileimage/img_";
  // let baseUrl =
  //   import.meta.env.MODE === "production"
  //     ? "http://srs.sf-express.com/fileimage/img_"
  //     : "http://srs.sit.sf-express.com/fileimage/img_";
  return baseUrl + md5(key) + ".jpg";
};

/**
 * 获取用户头像
 * @param account 用户工号
 */
export const getHeadImage = (account: string) => {
  const key = account + "*&^SFIMIMAGE^&*1" + account;
  return "http://srs.sf-express.com/fileimage/img_" + md5(key) + ".jpg";
};

/**
 * 设置分享菜单
 * @param options
 */
export const setShareMenu = (options: ShareInfo) => {
  console.log("设置导航栏开始", options);
  const { url, content, title, isShare } = options;
  const menuItem = {
    name: "分享",
    icon: ShareIcon,
    menuId: "shareId1",
  };
  let menuList = [menuItem];
  if (isShare) {
    menuList = [menuItem];
  } else {
    menuList = [];
  }
  const params = {
    callback: (res: any) => {
      if (res.errcode == 0) {
        // 成功
        console.log("设置menu成功：", res.data);
        if (res.data.menuId === "shareId1") {
          if (window.SFNativeIM) {
            const dataParams = {
              url,
              content,
              title,
              // pcUrl: '',
              iconurl: AppPictureUrl,
              shareword: "",
              selectType: 2, // 2：群和单聊
              maxSelectNumber: 10, //最大选择数
            };
            const shareParams = {
              callback: (res: any) => {
                if (res.errcode == 0) {
                  // 成功
                  console.log("分享成功", res.data);
                } else {
                  // 失败
                  console.log("分享失败", res.errmsg);
                }
              },
              data: dataParams,
            };
            window.SFNativeIM.shareService(shareParams);
          }
        }
      } else {
        // 失败
        console.log("设置menu失败", res);
      }
    },
    data: {
      menuList: menuList,
    },
  };
  window.SFNativeSetting && window.SFNativeSetting.setMenuList(params);
};

export const shareIM = (data: ShareInfo) => {
  return new Promise((resolve, reject) => {
    if (window.SFNativeIM) {
      const { url, content, title } = data;
      const dataParams = {
        url,
        content,
        title,
        iconurl: AppPictureUrl,
        shareword: "",
        selectType: 2,
        maxSelectNumber: 10,
      };
      const shareParams = {
        callback: (res: any) => {
          if (res.errcode == 0) {
            console.log("分享成功", res.data);
            resolve(true);
          } else {
            console.log("分享失败", res.errmsg);
            reject(res.errmsg);
          }
        },
        data: dataParams,
      };
      window.SFNativeIM.shareService(shareParams);
    } else {
      reject();
    }
  });
};
/**
 * 设置微应用导航栏样式
 * @param bgColor 背景色
 * @param textStyle 字体颜色
 */
export const setNavigationBarStyle = (bgColor: string, textStyle = "white") => {
  const params = {
    callback: (res: any) => {
      if (res.errcode == 0) {
        // 成功
        console.log(1, res.data);
      } else {
        // 失败
        console.log(2, res.errmsg);
      }
    },
    data: { color: bgColor, textStyle },
  };
  window.SFNativeWebView && window.SFNativeWebView.setNavigationBarColor(params);
};
/**
 * 设置微应用页面背景色
 * @param bgColor 背景色
 */
export const setNativePagerStyle = (bgColor: string) => {
  window.SFNativeWebView &&
    window.SFNativeWebView.setPageColor({
      data: {
        backgroundColor: bgColor,
        statusBarColor: bgColor,
        statusBarStyle: "",
      },
    });
};
/**
 * 设置微应用标题
 * @param title 标题
 */
export const setNativePagerTitle = (title: string) => {
  window.SFNativeWebView &&
    window.SFNativeWebView.setNavigationBarTitle({
      data: {
        title,
      },
    });
};

export const openAppUrl = (url: string) => {
  const params = {
    callback: (res: any) => {
      console.log("open url res:", res);
      if (res.errcode == 0) {
        // 成功
        console.log(res.data);
      } else {
        // 失败
        console.log(res.errmsg);
      }
    },
    data: { url: url, out: true },
  };
  window.SFNativeWebView.openUrl(params);
};

export const openAppUrlPromise = (url: string) => {
  return new Promise((resolve, reject) => {
    const params = {
      callback: (res: any) => {
        console.log("open url:", url, "res:", res);
        if (res.errcode == 0) {
          // 成功
          resolve(res.data);
        } else {
          // 失败
          reject(res.errmsg);
          //TODO 可处理跳转失败逻辑
        }
      },
      data: { url: url, out: true },
    };
    window.SFNativeWebView.openUrl(params);
  });
};

export const systemInfo = {
  systemType: "",
};
export const getDeviceSystemType = () => {
  if (systemInfo.systemType !== "") {
    return Promise.resolve(systemInfo.systemType.toLowerCase());
  }

  return new Promise((resolve) => {
    const params = {
      callback: (res: any) => {
        if (res.errcode === 0) {
          systemInfo.systemType = res.data.systemType;
          resolve(systemInfo.systemType.toLowerCase());
        } else {
          resolve("Android".toLowerCase());
        }
      },
    };
    try {
      window.SFNativeDevice.getDeviceInfo(params);
    } catch (error) {
      // console.error(error);
      resolve("Android".toLowerCase());
    }
  });
};
