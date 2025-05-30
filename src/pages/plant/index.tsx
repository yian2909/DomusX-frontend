import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Plant = () => {
  const [autoWatering, setAutoWatering] = useState(true);
  const [scheduledWatering, setScheduledWatering] = useState(false);
  const [humidityThreshold, setHumidityThreshold] = useState(40);

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleWaterNow = () => {
    Taro.showToast({
      title: '已启动浇水！',
      icon: 'success',
      duration: 2000
    });
  };

  const handleSliderClick = (e: any) => {
    const target = e.target as HTMLElement;
    const slider = target.closest('.threshold-slider');
    if (slider) {
      const rect = slider.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const percentage = Math.round((x / rect.width) * 100);
      setHumidityThreshold(Math.max(0, Math.min(100, percentage)));
    }
  };

  return (
    <View className="container">

      <View className="device-banner">
        <View className="device-info">
          <Text className="device-title">智能植物监控</Text>
          <Text className="device-desc">温度+土壤湿度+水泵</Text>
        </View>
        <View className="device-icon">🌱</View>
      </View>

      <View className="status-card">
        <Text className="card-title">实时状态</Text>
        <View className="status-grid">
          <View className="status-item">
            <Text className="status-icon">🌡️</Text>
            <Text className="status-value">24°C</Text>
            <Text className="status-label">环境温度</Text>
          </View>
          <View className="status-item">
            <Text className="status-icon">💧</Text>
            <Text className="status-value">65%</Text>
            <Text className="status-label">土壤湿度</Text>
          </View>
          <View className="status-item">
            <Text className="status-icon">☀️</Text>
            <Text className="status-value">适中</Text>
            <Text className="status-label">光照强度</Text>
          </View>
          <View className="status-item">
            <Text className="status-icon">⏱️</Text>
            <Text className="status-value">2小时前</Text>
            <Text className="status-label">上次浇水</Text>
          </View>
        </View>
      </View>

      <View className="control-card">
        <Text className="card-title">浇水控制</Text>

        <View className="toggle-switch">
          <Text className="toggle-label">自动浇水</Text>
          <View className="switch">
            <View
              className={`slider ${autoWatering ? 'active' : ''}`}
              onClick={() => setAutoWatering(!autoWatering)}
            />
          </View>
        </View>

        <View className="threshold-control">
          <View className="threshold-header">
            <Text>湿度阈值</Text>
            <Text className="threshold-value">{humidityThreshold}%</Text>
          </View>
          <View className="slider-container">
            <View
              className="threshold-slider"
              style={{ background: `linear-gradient(to right, #32cd32 ${humidityThreshold}%, #e0e0e0 ${humidityThreshold}%)` }}
            >
              <View
                className="slider-thumb"
                style={{ left: `${humidityThreshold}%` }}
                onClick={handleSliderClick}
              />
            </View>
          </View>
        </View>

        <View className="toggle-switch">
          <Text className="toggle-label">定时浇水</Text>
          <View className="switch">
            <View
              className={`slider ${scheduledWatering ? 'active' : ''}`}
              onClick={() => setScheduledWatering(!scheduledWatering)}
            />
          </View>
        </View>

        <View className="button" onClick={handleWaterNow}>立即浇水</View>
      </View>

      <View className="history-card">
        <View className="history-header">
          <Text className="history-title">历史数据</Text>
          <Text className="history-filter">本周</Text>
        </View>

        <View className="chart-placeholder">土壤湿度变化图表</View>
      </View>
    </View>
  );
};

export default Plant;
