export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/device/index",
    "pages/ai/index",
    "pages/my/index",
    "pages/login/index",
    "pages/userInfo/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#4a90e2",
    navigationBarTitleText: "DomusX",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#2c2c2c",
    selectedColor: "#1296db",
    backgroundColor: "#fff",
    borderStyle: "white",
    list: [
      {
        text: "首页",
        pagePath: "pages/index/index",
        iconPath: "static/tabs/home_default.png",
        selectedIconPath: "static/tabs/home_selected.png",
      },
      {
        text: "设备",
        pagePath: "pages/device/index",
        iconPath: "static/tabs/device_default.png",
        selectedIconPath: "static/tabs/device_selected.png",
      },
      {
        text: "智能",
        pagePath: "pages/ai/index",
        iconPath: "static/tabs/ai_default.png",
        selectedIconPath: "static/tabs/ai_selected.png",
      },
      {
        text: "我的",
        pagePath: "pages/my/index",
        iconPath: "static/tabs/my_default.png",
        selectedIconPath: "static/tabs/my_selected.png",
      },
    ],
  },
});
