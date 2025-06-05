import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import * as plantService from "@/service/plant";
import type { EnvironmentDataVO, WateringStatusVO } from "@/types/plant";
import "./index.scss";

const Plant = () => {
  const DEVICE_ID = "ESP8266_E0:98:06:A7:F6:A6";
  const [autoWatering, setAutoWateringState] = useState(false);
  const [scheduledWatering, setScheduledWatering] = useState(false);
  const [humidityThreshold, setHumidityThreshold] = useState(0);
  const [envData, setEnvData] = useState<EnvironmentDataVO | null>(null);
  const [isUpdatingThreshold, setIsUpdatingThreshold] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isWatering, setIsWatering] = useState(false);
  const updateTimerRef = useRef<NodeJS.Timeout>();

  // 将后端干旱值(0-1024)转换为前端湿度值(0-100)
  const convertToFrontendValue = (backendValue: number): number => {
    return Math.round(100 - (backendValue / 10.24));
  };

  // 将前端湿度值(0-100)转换为后端干旱值(0-1024)
  const convertToBackendValue = (frontendValue: number): number => {
    return Math.round((100 - frontendValue) * 10.24);
  };

  // 获取浇水状态
  const fetchWateringStatus = async () => {
    try {
      const { data } = await plantService.getWateringStatus(DEVICE_ID);
      setAutoWateringState(data.autoMode);
      setHumidityThreshold(convertToFrontendValue(data.threshold));
    } catch (error) {
      console.error('获取浇水状态失败:', error);
      Taro.showToast({
        title: '获取状态失败',
        icon: 'error',
        duration: 2000
      });
    }
  };

  // 页面加载时获取状态
  useEffect(() => {
    fetchWateringStatus();
  }, []);

  // 更新阈值
  const updateThreshold = async (newValue: number) => {
    try {
      setIsUpdatingThreshold(true);
      const backendValue = convertToBackendValue(newValue);
      await plantService.setWateringThreshold(DEVICE_ID, backendValue);
      setHumidityThreshold(newValue);
      Taro.showToast({
        title: '阈值设置成功',
        icon: 'success',
        duration: 1000
      });
    } catch (error) {
      console.error('设置阈值失败:', error);
      Taro.showToast({
        title: '设置失败，请重试',
        icon: 'error',
        duration: 2000
      });
      setHumidityThreshold(humidityThreshold);
    } finally {
      setIsUpdatingThreshold(false);
    }
  };

  // 处理拖动开始
  const handleDragStart = (e: any) => {
    setIsDragging(true);
    const touch = e.touches[0];
    const query = Taro.createSelectorQuery();
    query.select('.slider-container').boundingClientRect();
    query.exec((res) => {
      if (res[0]) {
        const { left, width } = res[0];
        const x = Math.max(0, Math.min(touch.clientX - left, width));
        const percentage = Math.round((x / width) * 100);
        const newValue = Math.max(0, Math.min(100, percentage));
        setHumidityThreshold(newValue);
      }
    });
  };

  // 处理拖动中
  const handleDragMove = (e: any) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const query = Taro.createSelectorQuery();
    query.select('.slider-container').boundingClientRect();
    query.exec((res) => {
      if (res[0]) {
        const { left, width } = res[0];
        const x = Math.max(0, Math.min(touch.clientX - left, width));
        const percentage = Math.round((x / width) * 100);
        const newValue = Math.max(0, Math.min(100, percentage));
        setHumidityThreshold(newValue);
      }
    });
  };

  // 处理拖动结束
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // 清除之前的定时器
    if (updateTimerRef.current) {
      clearTimeout(updateTimerRef.current);
    }

    // 延迟发送请求，避免频繁调用
    updateTimerRef.current = setTimeout(() => {
      updateThreshold(humidityThreshold);
    }, 300);
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (updateTimerRef.current) {
        clearTimeout(updateTimerRef.current);
      }
    };
  }, []);

  // 获取环境数据
  const fetchEnvironmentData = async () => {
    try {
      const { data } = await plantService.getEnvironmentData(DEVICE_ID);
      setEnvData(data);
    } catch (error) {
      console.error('获取环境数据失败:', error);
      Taro.showToast({
        title: '获取数据失败',
        icon: 'error',
        duration: 2000
      });
    }
  };

  // 页面加载和定时更新
  useEffect(() => {
    fetchEnvironmentData();
    // 每30秒更新一次数据
    const timer = setInterval(fetchEnvironmentData, 30000);
    return () => clearInterval(timer);
  }, []);

  // 处理自动浇水开关
  const handleAutoWateringChange = async (enabled: boolean) => {
    try {
      const enabledValue = enabled ? "on" : "off";
      await plantService.setAutoWatering(DEVICE_ID, enabledValue);
      setAutoWateringState(enabled);
      Taro.showToast({
        title: enabled ? '已开启自动浇水' : '已关闭自动浇水',
        icon: 'success',
        duration: 2000
      });
    } catch (error) {
      console.error('设置自动浇水失败:', error);
      Taro.showToast({
        title: '设置失败，请重试',
        icon: 'error',
        duration: 2000
      });
      setAutoWateringState(!enabled);
    }
  };

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleWaterNow = async () => {
    if (autoWatering) {
      Taro.showToast({
        title: '请先关闭自动浇水',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    try {
      const command = isWatering ? "off" : "on";
      await plantService.manualWatering(DEVICE_ID, command);
      setIsWatering(!isWatering);
      Taro.showToast({
        title: isWatering ? '已停止浇水' : '已启动浇水',
        icon: 'success',
        duration: 2000
      });
    } catch (error) {
      console.error('手动浇水失败:', error);
      Taro.showToast({
        title: '操作失败，请重试',
        icon: 'error',
        duration: 2000
      });
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
            <Text className="status-value">{envData?.temperature ?? "--"}°C</Text>
            <Text className="status-label">环境温度</Text>
          </View>
          <View className="status-item">
            <Text className="status-icon">💧</Text>
            <Text className="status-value">{envData?.humidity ?? "--"}%</Text>
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
              onClick={() => handleAutoWateringChange(!autoWatering)}
            />
          </View>
        </View>

        <View className="threshold-control">
          <View className="threshold-header">
            <Text>湿度阈值</Text>
            <Text className="threshold-value">
              {isUpdatingThreshold ? '设置中...' : `${humidityThreshold}%`}
            </Text>
          </View>
          <View
            className="slider-container"
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
            onTouchCancel={handleDragEnd}
          >
            <View
              className="threshold-slider"
              style={{
                background: `linear-gradient(to right, #32cd32 ${humidityThreshold}%, #e0e0e0 ${humidityThreshold}%)`,
                opacity: isUpdatingThreshold ? 0.5 : 1
              }}
            >
              <View
                className="slider-thumb"
                style={{ left: `${humidityThreshold}%` }}
              />
            </View>
          </View>
          <Text className="threshold-tip">数值越小越干旱，达到阈值时自动浇水</Text>
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

        <View
          className={`button ${isWatering ? 'watering' : ''}`}
          onClick={handleWaterNow}
        >
          {isWatering ? '停止浇水' : '立即浇水'}
        </View>
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
