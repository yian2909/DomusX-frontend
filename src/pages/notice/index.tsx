import React from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Device = () => {
  const newsList = [
    {
      id: 1,
      title: "智能家居行业最新动态",
      summary: "2024年智能家居市场规模持续扩大，AI与物联网深度融合，推动家庭自动化体验升级。",
      date: "2024-05-28",
      source: "智能家居网",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400"
    },
    {
      id: 2,
      title: "社区活动：智能设备体验日",
      summary: "本周末社区将举办智能设备体验活动，欢迎居民前来参与，现场有丰富奖品。",
      date: "2024-05-27",
      source: "社区公告",
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=400"
    },
    {
      id: 3,
      title: "安全提醒：设备远程控制注意事项",
      summary: "为保障家庭安全，建议定期更换智能设备密码，谨防远程控制风险。",
      date: "2024-05-26",
      source: "安全中心",
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400"
    }
  ];

  return (
    <View className="container">


      <View className="news-list">
        {newsList.map(news => (
          <View key={news.id} className="news-card">
            <Image className="news-img" src={news.image} mode="aspectFill" />
            <View className="news-content">
              <Text className="news-title">{news.title}</Text>
              <Text className="news-summary">{news.summary}</Text>
              <View className="news-meta">
                <Text>{news.date}</Text>
                <Text className="news-source">{news.source}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Device;
