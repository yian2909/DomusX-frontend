import React, { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { AtSlider } from "taro-ui";
import Taro from "@tarojs/taro";
import { getDevice } from "@/service/device";
import {
  setAuto,
  setSwitch,
  setLightCmd,
  setSoundSensor,
  setThreshold,
  setColor,
} from "@/service/light";
import "./index.scss";

const Light = () => {
  const [device, setDevice] = useState<Device>({
    id: 3,
    deviceId: "ESP8266_40F5203F30C0",
    name: "智能灯",
    type: 0,
    status: 0,
  });
  const [brightness, setBrightness] = useState(900);
  const [power, setPower] = useState(true);
  const [autoMode, setAutoMode] = useState(true);
  const [voiceControl, setVoiceControl] = useState(true);
  const [lightSensor, setLightSensor] = useState(true);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedMode, setSelectedMode] = useState("日光模式");

  const colors = [
    { id: 0, value: "#ffffff", label: "白色" },
    { id: 1, value: "#ffd700", label: "黄色" },
    { id: 2, value: "#ff6347", label: "红色" },
    { id: 3, value: "#4169e1", label: "蓝色" },
    { id: 4, value: "#32cd32", label: "绿色" },
    { id: 5, value: "#9370db", label: "紫色" },
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

  const getDeviceData = async (id: number) => {
    const res = await getDevice(id);
    setDevice(res.data);
  };

  const handleSetPower = async () => {
    const flag = power ? 1 : 0;
    let success = false;

    while (!success) {
      try {
        await setSwitch(device.deviceId, flag);
        success = true;
      } catch (error) {
        console.error("Attempt to set power failed:", error);
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  };

  const handleSetAuto = async () => {
    const flag = autoMode ? 1 : 0;
    try {
      await setAuto(device.deviceId, flag);
    } catch (error) {
      console.error("Second attempt to set color failed:", error);
    }
  };

  const handleSetVoiceSensor = async () => {
    const flag = voiceControl ? 1 : 0;
    try {
      await setSoundSensor(device.deviceId, flag);
    } catch (error) {
      console.error("Second attempt to set color failed:", error);
    }
  };

  const handleSetLightSensor = async () => {
    const flag = lightSensor ? 1 : 0;
    try {
      await setLightCmd(device.deviceId, flag);
    } catch (error) {
      console.error("Second attempt to set color failed:", error);
    }
  };

  const handleSetColor = async () => {
    try {
      await setColor(device.deviceId, selectedColor);
    } catch (error) {
      console.error("Second attempt to set color failed:", error);
    }
    // let success = false;

    // while (!success) {
    //   try {
    //     await setColor(device.deviceId, selectedColor);
    //     success = true;
    //   } catch (error) {
    //     // console.error("Attempt to set power failed:", error);
    //     await new Promise((resolve) => setTimeout(resolve, 2000));
    //   }
    // }
  };

  const handleBrightnessChange = async (value) => {
    setBrightness(value);
    await setThreshold(device.deviceId, value);
  };

  useEffect(() => {
    // getDeviceData(1);
  }, []);

  return (
    <View className="container">
      <View className="device-banner">
        <View className="device-info">
          <Text className="device-title">{device.name}</Text>
          <Text className="device-desc">光感+声控自动调节</Text>
        </View>
        <View className="device-icon">💡</View>
      </View>

      <View className="control-card">
        <Text className="card-title">灯光控制</Text>

        <View className="toggle-switch">
          <Text className="toggle-label">电源</Text>
          <View className="switch">
            <View
              className={`slider ${power ? "active" : ""}`}
              onClick={() => {
                setPower(!power);
                handleSetPower();
              }}
            />
          </View>
        </View>

        <View className="brightness-control">
          <View className="brightness-header">
            <Text>光控阈值</Text>
            <Text className="brightness-value">{brightness}</Text>
          </View>
          <View className="slider-container">
            <AtSlider
              min={100}
              max={1000}
              value={brightness}
              step={10}
              activeColor="#4a90e2"
              backgroundColor="#e0e0e0"
              blockColor="#4a90e2"
              blockSize={15}
              onChange={(value) => handleBrightnessChange(value)}
            />
          </View>
        </View>

        <View className="toggle-switch">
          <Text className="toggle-label">自动模式</Text>
          <View className="switch">
            <View
              className={`slider ${autoMode ? "active" : ""}`}
              onClick={() => {
                setAutoMode(!autoMode);
                handleSetAuto();
              }}
            />
          </View>
        </View>

        <View className="toggle-switch">
          <Text className="toggle-label">声控开关</Text>
          <View className="switch">
            <View
              className={`slider ${voiceControl ? "active" : ""}`}
              onClick={() => {
                setVoiceControl(!voiceControl);
                handleSetVoiceSensor();
              }}
            />
          </View>
        </View>

        <View className="toggle-switch">
          <Text className="toggle-label">光感调节</Text>
          <View className="switch">
            <View
              className={`slider ${lightSensor ? "active" : ""}`}
              onClick={() => {
                setLightSensor(!lightSensor);
                handleSetLightSensor();
              }}
            />
          </View>
        </View>
      </View>

      <View className="control-card">
        <Text className="card-title">灯光颜色</Text>
        <View className="color-options">
          {colors.map((color) => (
            <View
              key={color.value}
              className={`color-option ${selectedColor === color.id ? "active" : ""}`}
              style={{ backgroundColor: color.value }}
              onClick={() => {
                setSelectedColor(color.id);
                handleSetColor();
              }}
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
              className={`mode-option ${selectedMode === mode.name ? "active" : ""}`}
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
