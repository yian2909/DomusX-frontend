import React, { useState } from "react";
import { View, Text, Navigator } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Light = () => {
  const [brightness, setBrightness] = useState(75);
  const [power, setPower] = useState(true);
  const [autoMode, setAutoMode] = useState(true);
  const [voiceControl, setVoiceControl] = useState(true);
  const [lightSensor, setLightSensor] = useState(true);
  const [selectedColor, setSelectedColor] = useState("#ffffff");
  const [selectedMode, setSelectedMode] = useState("日光模式");

  const colors = [
    { value: "#ffffff", label: "白色" },
    { value: "#ffd700", label: "黄色" },
    { value: "#ff6347", label: "红色" },
    { value: "#4169e1", label: "蓝色" },
    { value: "#32cd32", label: "绿色" },
    { value: "#9370db", label: "紫色" },
  ];

  const modes = [
    { icon: "🌞", name: "日光模式" },
    { icon: "📚", name: "阅读模式" },
    { icon: "🎬", name: "影院模式" },
    { icon: "🌙", name: "睡眠模式" },
  ];

  const handleBack = () => {
    Taro.navigateBack();
  };

  return (
    <View className="container">

      <View className="device-banner">
        <View className="device-info">
          <Text className="device-title">客厅灯光</Text>
          <Text className="device-desc">光感+声控自动调节</Text>
        </View>
        <View className="device-icon">💡</View>
      </View>

      <View className="control-card">
        <Text className="card-title">灯光控制</Text>

        <View className="toggle-switch">
          <Text className="toggle-label">电源</Text>
          <View className="switch">
            <View className={`slider ${power ? 'active' : ''}`} onClick={() => setPower(!power)} />
          </View>
        </View>

        <View className="brightness-control">
          <View className="brightness-header">
            <Text>亮度</Text>
            <Text className="brightness-value">{brightness}%</Text>
          </View>
          <View className="slider-container">
            <View
              className="brightness-slider"
              style={{ background: `linear-gradient(to right, #4a90e2 ${brightness}%, #e0e0e0 ${brightness}%)` }}
            >
              <View
                className="slider-thumb"
                style={{ left: `${brightness}%` }}
                onClick={(e) => {
                  const rect = e.currentTarget.parentElement.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percentage = Math.round((x / rect.width) * 100);
                  setBrightness(Math.max(0, Math.min(100, percentage)));
                }}
              />
            </View>
          </View>
        </View>

        <View className="toggle-switch">
          <Text className="toggle-label">自动模式</Text>
          <View className="switch">
            <View className={`slider ${autoMode ? 'active' : ''}`} onClick={() => setAutoMode(!autoMode)} />
          </View>
        </View>

        <View className="toggle-switch">
          <Text className="toggle-label">声控开关</Text>
          <View className="switch">
            <View className={`slider ${voiceControl ? 'active' : ''}`} onClick={() => setVoiceControl(!voiceControl)} />
          </View>
        </View>

        <View className="toggle-switch">
          <Text className="toggle-label">光感调节</Text>
          <View className="switch">
            <View className={`slider ${lightSensor ? 'active' : ''}`} onClick={() => setLightSensor(!lightSensor)} />
          </View>
        </View>
      </View>

      <View className="control-card">
        <Text className="card-title">灯光颜色</Text>
        <View className="color-options">
          {colors.map((color) => (
            <View
              key={color.value}
              className={`color-option ${selectedColor === color.value ? 'active' : ''}`}
              style={{ backgroundColor: color.value }}
              onClick={() => setSelectedColor(color.value)}
            />
          ))}
        </View>
      </View>

      <View className="control-card">
        <Text className="card-title">灯光模式</Text>
        <View className="mode-options">
          {modes.map((mode) => (
            <View
              key={mode.name}
              className={`mode-option ${selectedMode === mode.name ? 'active' : ''}`}
              onClick={() => setSelectedMode(mode.name)}
            >
              <Text className="mode-icon">{mode.icon}</Text>
              <Text>{mode.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Light;
