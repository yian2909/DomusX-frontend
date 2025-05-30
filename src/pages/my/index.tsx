import { View, Text, Image, Navigator } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useAppSelector, useAppDispatch } from "@/store";
import { setUserInfo } from "@/store/user";
import "./index.scss";
import { logout } from "@/service/user";

export default function My() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const handleClickLogin = () => {
    Taro.redirectTo({
      url: "/pages/login/index",
    });
  };

  const handleLogout = async () => {
    const token = Taro.getStorageSync("token");
    try {
      await logout(token);
      Taro.removeStorageSync("token");
      Taro.removeStorageSync("user");
      dispatch(setUserInfo({}));
      Taro.reLaunch({
        url: "/pages/my/index",
      });
    } catch (error) {
      Taro.showToast({
        title: "退出失败",
        icon: "error",
      });
    }
  };

  const menuItems = [
    { icon: "📱", text: "管理设备", url: "/pages/device/index" },
    { icon: "🔮", text: "智能控制", url: "/pages/ai/index" },
    { icon: "⚙️", text: "设置", url: "/pages/settings/index" },
  ];

  return (
    <View className="container">
      <View className="profile-header">
        <View className="avatar-wrapper">
          {userInfo.id > 0 ? (
            <Image className="avatar" src={userInfo.avatar} mode="aspectFill" />
          ) : (
            <View className="avatar-placeholder">👤</View>
          )}
        </View>
        {userInfo.id > 0 ? (
          <>
            <Text className="user-name">{userInfo.nickname}</Text>
            <Text className="user-email">{userInfo.email || "未设置邮箱"}</Text>
          </>
        ) : (
          <View className="login-btn" onClick={handleClickLogin}>
            <Text>点击登录</Text>
          </View>
        )}
      </View>

      <View className="menu-list">
        {menuItems.map((item, index) => (
          <Navigator key={index} url={item.url} className="menu-item">
            <Text className="menu-icon">{item.icon}</Text>
            <Text className="menu-text">{item.text}</Text>
            <Text className="menu-arrow">›</Text>
          </Navigator>
        ))}
        {userInfo.id > 0 && (
          <View className="menu-item" onClick={handleLogout}>
            <Text className="menu-icon">🚪</Text>
            <Text className="menu-text">退出登录</Text>
            <Text className="menu-arrow">›</Text>
          </View>
        )}
      </View>
    </View>
  );
}
