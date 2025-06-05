import React from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const NoticeDetail = () => {
  // 通过路由参数获取news对象
  const news = Taro.getCurrentInstance().router?.params?.news
    ? JSON.parse(decodeURIComponent(Taro.getCurrentInstance().router?.params?.news))
    : null;

  if (!news) {
    return (
      <View className="container">
        <Text>未找到资讯详情</Text>
      </View>
    );
  }

  return (
    <View className="container detail-container">
      <View className="detail-header">
        <Image className="detail-img" src={news.coverImage} mode="aspectFill" />
        <View className="detail-title">{news.title}</View>
        <View className="detail-meta">
          <Text>{news.updateTime?.slice(0, 16)}</Text>
          <Text className="detail-source">{news.source}</Text>
          <Text className="detail-views">浏览量：{news.viewCount}</Text>
        </View>
      </View>
      <View className="detail-content">
        <Text>{news.content}</Text>
      </View>
      <View className="detail-id">资讯ID：{news.id}</View>
    </View>
  );
};

export default NoticeDetail;