import { View, Image, Navigator } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtButton, AtCard } from "taro-ui";
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
      // 清空用户状态
      dispatch(setUserInfo({}));
      // 重新加载当前页面
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

  return (
    <>
      <View className="my">
        {userInfo.id > 0 ? (
          <View>
            <Navigator url="/pages/userInfo/index">
              <AtCard title={userInfo.nickname}>
                <Image src={userInfo.avatar} className="avatar" />
              </AtCard>
            </Navigator>
            <AtButton onClick={handleLogout} type="primary">
              退出登录
            </AtButton>
          </View>
        ) : null}
        {userInfo.id > 0 ? null : (
          <AtButton onClick={handleClickLogin} type="primary">
            前往登录
          </AtButton>
        )}
      </View>
    </>
  );
}
