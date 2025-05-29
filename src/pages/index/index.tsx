import { View, Swiper, SwiperItem } from "@tarojs/components";
import React from "react";
import Taro from "@tarojs/taro";

import "./index.scss";

const index = () => {
  const hanldeSwiper = () => {
    Taro.navigateTo({
      url: "/pages/information/index",
    });
  };

  const hanldeDevice = () => {
    Taro.switchTab({
      url: "/pages/device/index",
    });
  };

  return (
    <>
      <View className="flex">
        {/* 资讯栏 */}
        <Swiper
          onClick={hanldeSwiper}
          indicatorDots
          indicatorColor="#999"
          indicatorActiveColor="#333"
          autoplay
          circular
        >
          <SwiperItem>
            <View>1</View>
          </SwiperItem>
          <SwiperItem>
            <View>2</View>
          </SwiperItem>
          <SwiperItem>
            <View>3</View>
          </SwiperItem>
        </Swiper>

        {/* 天气卡片 */}
        <View className="weather m-5"></View>

        {/* 设备列表展示 */}
        <View className="p-5">
          <View className="row">
            <View className="font">我的设备</View>
            <View onClick={hanldeDevice} className="all">
              查看全部
            </View>

            {/* 设备列表 */}
          </View>
        </View>
      </View>
    </>
  );
};

export default index;
