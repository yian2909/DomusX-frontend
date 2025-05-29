import { View, Swiper, SwiperItem } from "@tarojs/components";
import React from "react";
import Taro from "@tarojs/taro";

const index = () => {
  const hanldeSwiper = () => {
    Taro.navigateTo({
      url: "/pages/information/index",
    });
  };
  return (
    <>
      <View>
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
      </View>
    </>
  );
};

export default index;
