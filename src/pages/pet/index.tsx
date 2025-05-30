import React, { useState } from "react";
import { View, Text, Slider } from "@tarojs/components";
import { Picker, PickerView, PickerViewColumn } from "@tarojs/components";
import Taro from "@tarojs/taro";
import "./index.scss";

const Pet = () => {
  const [infrared, setInfrared] = useState(true);
  const [scheduledFeeding, setScheduledFeeding] = useState(false);
  const [feedOnApproach, setFeedOnApproach] = useState(true);
  const [feedAmount, setFeedAmount] = useState(50);
  const [feedingMode, setFeedingMode] = useState('interval'); // 'interval' or 'fixed'
  const [intervalHours, setIntervalHours] = useState(12);
  const [feedingTimes, setFeedingTimes] = useState(['08:00']);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentTimeIndex, setCurrentTimeIndex] = useState(0);
  const [showIntervalPicker, setShowIntervalPicker] = useState(false);

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleFeedNow = () => {
    Taro.showToast({
      title: `正在喂食${feedAmount}g...`,
      icon: 'success',
      duration: 2000
    });
  };

  const handleSliderChange = (e) => {
    setFeedAmount(e.detail.value);
  };

  const handleIntervalChange = (e) => {
    setIntervalHours(Number(e.detail.value));
  };

  const handleTimeSelect = (e) => {
    const newTimes = [...feedingTimes];
    const selectedTime = timeRange[e.detail.value[0]];
    newTimes[currentTimeIndex] = selectedTime;
    setFeedingTimes(newTimes);
    setShowTimePicker(false);
  };

  const handleOpenTimePicker = (index) => {
    setCurrentTimeIndex(index);
    setShowTimePicker(true);
  };

  const handleAddTime = () => {
    if (feedingTimes.length < 5) {
      setFeedingTimes([...feedingTimes, '08:00']);
    } else {
      Taro.showToast({
        title: '最多设置5个时间点',
        icon: 'none',
        duration: 2000
      });
    }
  };

  const handleRemoveTime = (index) => {
    const newTimes = feedingTimes.filter((_, i) => i !== index);
    setFeedingTimes(newTimes);
  };

  const timeRange = Array.from({ length: 24 * 4 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  });

  const intervalRange = Array.from({ length: 24 }, (_, i) => `${i + 1}小时`);

  return (
    <View className="container">
      <View className="device-banner">
        <View className="device-info">
          <Text className="device-title">智能宠物喂食器</Text>
          <Text className="device-desc">红外+摄像头+震动马达</Text>
        </View>
        <View className="device-icon">🐱</View>
      </View>

      <View className="control-card">
        <Text className="card-title">摄像头视图</Text>
        <View className="camera-view">宠物摄像头实时画面</View>
      </View>

      <View className="control-card">
        <Text className="card-title">喂食控制</Text>

        <View className="toggle-switch">
          <Text className="toggle-label">摄像头</Text>
          <View className="switch">
            <View
              className={`slider ${infrared ? 'active' : ''}`}
              onClick={() => setInfrared(!infrared)}
            />
          </View>
        </View>

        <View className="feed-amount">
          <View className="feed-header">
            <Text>喂食量</Text>
            <Text className="feed-value">{feedAmount}g</Text>
          </View>
          <View className="slider-container">
            <Slider
              min={10}
              max={100}
              value={feedAmount}
              onChange={handleSliderChange}
              className="feed-slider"
            />
          </View>
        </View>

        <View className="button" onClick={handleFeedNow}>立即喂食</View>
      </View>

      <View className="control-card">
        <Text className="card-title">定时喂食</Text>

        <View className="toggle-switch">
          <Text className="toggle-label">定时喂食</Text>
          <View className="switch">
            <View
              className={`slider ${scheduledFeeding ? 'active' : ''}`}
              onClick={() => setScheduledFeeding(!scheduledFeeding)}
            />
          </View>
        </View>

        {scheduledFeeding && (
          <View className="feeding-schedule">
            <View className="mode-selector">
              <View
                className={`mode-option ${feedingMode === 'interval' ? 'active' : ''}`}
                onClick={() => setFeedingMode('interval')}
              >
                <Text>间隔模式</Text>
              </View>
              <View
                className={`mode-option ${feedingMode === 'fixed' ? 'active' : ''}`}
                onClick={() => setFeedingMode('fixed')}
              >
                <Text>定点模式</Text>
              </View>
            </View>

            {feedingMode === 'interval' ? (
              <View className="interval-picker">
                <Text className="time-label">喂食间隔</Text>
                <View
                  className="picker-value"
                  onClick={() => setShowIntervalPicker(true)}
                >
                  <Text>{intervalHours}小时</Text>
                  <Text className="picker-arrow">▼</Text>
                </View>
              </View>
            ) : (
              <View className="fixed-times">
                <Text className="time-label">喂食时间</Text>
                {feedingTimes.map((time, index) => (
                  <View key={index} className="time-item">
                    <View
                      className="picker-value"
                      onClick={() => handleOpenTimePicker(index)}
                    >
                      <Text>{time}</Text>
                      <Text className="picker-arrow">▼</Text>
                    </View>
                    {index > 0 && (
                      <View
                        className="remove-time"
                        onClick={() => handleRemoveTime(index)}
                      >
                        ✕
                      </View>
                    )}
                  </View>
                ))}
                {feedingTimes.length < 5 && (
                  <View className="add-time" onClick={handleAddTime}>
                    <Text>+ 添加时间</Text>
                  </View>
                )}
              </View>
            )}
          </View>
        )}

        <View className="toggle-switch">
          <Text className="toggle-label">宠物靠近时喂食</Text>
          <View className="switch">
            <View
              className={`slider ${feedOnApproach ? 'active' : ''}`}
              onClick={() => setFeedOnApproach(!feedOnApproach)}
            />
          </View>
        </View>
      </View>

      {showTimePicker && (
        <View className="time-picker-popup">
          <View className="time-picker-mask" onClick={() => setShowTimePicker(false)} />
          <View className="time-picker-content">
            <View className="time-picker-header">
              <Text className="time-picker-cancel" onClick={() => setShowTimePicker(false)}>取消</Text>
              <Text className="time-picker-title">选择时间</Text>
              <Text className="time-picker-confirm" onClick={() => setShowTimePicker(false)}>确定</Text>
            </View>
            <PickerView
              className="time-picker-view"
              indicatorStyle="height: 80rpx;"
              value={[timeRange.indexOf(feedingTimes[currentTimeIndex])]}
              onChange={handleTimeSelect}
            >
              <PickerViewColumn>
                {timeRange.map(time => (
                  <View key={time} className="time-picker-item">{time}</View>
                ))}
              </PickerViewColumn>
            </PickerView>
          </View>
        </View>
      )}

      {showIntervalPicker && (
        <View className="time-picker-popup">
          <View className="time-picker-mask" onClick={() => setShowIntervalPicker(false)} />
          <View className="time-picker-content">
            <View className="time-picker-header">
              <Text className="time-picker-cancel" onClick={() => setShowIntervalPicker(false)}>取消</Text>
              <Text className="time-picker-title">选择间隔</Text>
              <Text className="time-picker-confirm" onClick={() => setShowIntervalPicker(false)}>确定</Text>
            </View>
            <PickerView
              className="time-picker-view"
              indicatorStyle="height: 80rpx;"
              value={[intervalHours - 1]}
              onChange={(e) => {
                setIntervalHours(Number(e.detail.value[0]) + 1);
                setShowIntervalPicker(false);
              }}
            >
              <PickerViewColumn>
                {intervalRange.map(interval => (
                  <View key={interval} className="time-picker-item">{interval}</View>
                ))}
              </PickerViewColumn>
            </PickerView>
          </View>
        </View>
      )}
    </View>
  );
};

export default Pet;
