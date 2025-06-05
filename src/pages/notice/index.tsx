import React, { useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { getNewsList } from "@/service/news";

import "./index.scss";

const Notice = () => {
  const [newsList, setNewsList] = useState<NewsVO[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getNewsList();
        if (res.code === 0 && Array.isArray(res.data)) {
          setNewsList(res.data);
        } else {
          Taro.showToast({ title: res.msg || "获取资讯失败", icon: "none" });
        }
      } catch {
        Taro.showToast({ title: "获取资讯失败", icon: "none" });
      }
    };
    fetchNews();
  }, []);

  return (
    <View className="container">
      <View className="news-list">
        {newsList.map(news => (
          <View
            key={news.id}
            className="news-card"
            onClick={() => {
              Taro.navigateTo({
                url: `/pages/notice-detail/index?news=${encodeURIComponent(JSON.stringify(news))}`
              });
            }}
          >
            <Image className="news-img" src={news.coverImage} mode="aspectFill" />
            <View className="news-content">
              <Text className="news-title">{news.title}</Text>
              <Text className="news-summary">{news.content}</Text>
              <View className="news-meta">
                <Text>{news.updateTime?.slice(0, 10)}</Text>
                <Text className="news-source">{news.source}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Notice;
