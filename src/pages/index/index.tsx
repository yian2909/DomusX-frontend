import React from "react";
import { View, Text, ScrollView, Navigator } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Index = () => {
  return (
    <View className="container">
      <View className="weather-card">
        <View className="weather-info">
          <Text className="weather-city">上海市</Text>
          <Text className="weather-temp">25°C</Text>
        </View>
        <View className="weather-details">
          <Text>☁️ 多云</Text>
          <Text>湿度: 65%</Text>
          <Text>空气质量: 良好</Text>
        </View>
      </View>

      <View className="section-title">
        <Text>我的设备</Text>
        <Text className="section-link">查看全部</Text>
      </View>

      <View className="device-grid">
        <Navigator url="/pages/light/index" className="device-card">
          <View className="device-header">
            <View className="device-icon">💡</View>
            <View className="device-status">开启</View>
          </View>
          <Text className="device-name">智能灯光</Text>
          <Text className="device-info">光感+声控自动调节</Text>
        </Navigator>

        <Navigator url="/pages/plant/index" className="device-card">
          <View className="device-header">
            <View className="device-icon">🌱</View>
            <View className="device-status">正常</View>
          </View>
          <Text className="device-name">植物监控</Text>
          <Text className="device-info">温度: 24°C 湿度: 60%</Text>
        </Navigator>

        <View className="device-card">
          <View className="device-header">
            <View className="device-icon">🚪</View>
            <View className="device-status">关闭</View>
          </View>
          <Text className="device-name">智能门锁</Text>
          <Text className="device-info">触摸+红外感应</Text>
        </View>

        <View className="device-card">
          <View className="device-header">
            <View className="device-icon">🐱</View>
            <View className="device-status">待机</View>
          </View>
          <Text className="device-name">宠物喂食器</Text>
          <Text className="device-info">下次喂食: 18:00</Text>
        </View>
      </View>

      <View className="section-title">
        <Text>常用场景</Text>
        <Text className="section-link">编辑</Text>
      </View>

      <ScrollView className="scene-grid" scrollX>
        <View className="scene-card">
          <View className="scene-icon">🌞</View>
          <Text className="scene-name">早晨模式</Text>
        </View>
        <View className="scene-card">
          <View className="scene-icon">🌙</View>
          <Text className="scene-name">睡眠模式</Text>
        </View>
        <View className="scene-card">
          <View className="scene-icon">🎬</View>
          <Text className="scene-name">影院模式</Text>
        </View>
        <View className="scene-card">
          <View className="scene-icon">🏠</View>
          <Text className="scene-name">离家模式</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;
