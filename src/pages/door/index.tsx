import React, { useState } from "react";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Door = () => {
  const [power, setPower] = useState(true);
  const [touchControl, setTouchControl] = useState(true);
  const [infrared, setInfrared] = useState(true);
  const [activeMode, setActiveMode] = useState("fast");

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleOpenDoor = () => {
    Taro.showToast({
      title: '正在开门...',
      icon: 'success',
      duration: 2000
    });
  };

  const handleCloseDoor = () => {
    Taro.showToast({
      title: '正在关门...',
      icon: 'success',
      duration: 2000
    });
  };

  return (
    <View className="container">

      <View className="device-banner">
        <View className="device-info">
          <Text className="device-title">智能门锁</Text>
          <Text className="device-desc">触摸+红外+步进电机</Text>
        </View>
        <View className="device-icon">🚪</View>
      </View>

      <View className="control-card">
        <Text className="card-title">门锁控制</Text>

        <View className="toggle-switch">
          <Text className="toggle-label">电源</Text>
          <View className="switch">
            <View
              className={`slider ${power ? 'active' : ''}`}
              onClick={() => setPower(!power)}
            />
          </View>
        </View>

        <View className="toggle-switch">
          <Text className="toggle-label">触摸控制</Text>
          <View className="switch">
            <View
              className={`slider ${touchControl ? 'active' : ''}`}
              onClick={() => setTouchControl(!touchControl)}
            />
          </View>
        </View>

        <View className="toggle-switch">
          <Text className="toggle-label">红外感应</Text>
          <View className="switch">
            <View
              className={`slider ${infrared ? 'active' : ''}`}
              onClick={() => setInfrared(!infrared)}
            />
          </View>
        </View>

        <View className="button" onClick={handleOpenDoor}>立即开门</View>
        <View className="button" onClick={handleCloseDoor}>立即关门</View>
      </View>

      <View className="control-card">
        <Text className="card-title">模式设置</Text>

        <View className="mode-options">
          <View
            className={`mode-option ${activeMode === 'fast' ? 'active' : ''}`}
            onClick={() => setActiveMode('fast')}
          >
            <Text className="mode-icon">👆</Text>
            <Text>快速模式</Text>
          </View>
          <View
            className={`mode-option ${activeMode === 'quiet' ? 'active' : ''}`}
            onClick={() => setActiveMode('quiet')}
          >
            <Text className="mode-icon">👌</Text>
            <Text>静音模式</Text>
          </View>
          <View
            className={`mode-option ${activeMode === 'safe' ? 'active' : ''}`}
            onClick={() => setActiveMode('safe')}
          >
            <Text className="mode-icon">🔒</Text>
            <Text>安全模式</Text>
          </View>
          <View
            className={`mode-option ${activeMode === 'timer' ? 'active' : ''}`}
            onClick={() => setActiveMode('timer')}
          >
            <Text className="mode-icon">⏱️</Text>
            <Text>定时模式</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Door;
