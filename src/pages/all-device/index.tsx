import React from "react";
import { View, Text, Navigator } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import "./index.scss";

const AllDevice = () => {
  const devices = [
    {
      id: 1,
      name: "智能灯光",
      status: "已连接",
      icon: "star",
      path: "/pages/light/index"
    },
    {
      id: 2,
      name: "植物监控",
      status: "已连接",
      icon: "shopping-bag",
      path: "/pages/plant/index"
    },
    {
      id: 3,
      name: "智能门锁",
      status: "已连接",
      icon: "lock",
      path: "/pages/door/index"
    },
    {
      id: 4,
      name: "宠物喂食器",
      status: "已连接",
      icon: "heart",
      path: "/pages/pet/index"
    }
  ];

  const handleAddDevice = () => {
    Taro.navigateTo({
      url: '/pages/add-device/index'
    });
  };

  const handleManageDevice = (device) => {
    Taro.navigateTo({
      url: device.path
    });
  };

  const handleDeleteDevice = (device) => {
    Taro.showModal({
      title: '确认删除',
      content: `确定要删除${device.name}吗？`,
      success: (res) => {
        if (res.confirm) {
          Taro.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          });
        }
      }
    });
  };

  return (
    <View className="container">


      <View className="content">
        <View className="add-device">
          <View className="add-btn" onClick={handleAddDevice}>
            <AtIcon value="add" size="20" color="#fff" />
            <Text>添加新设备</Text>
          </View>
        </View>

        <Text className="section-title">我的设备</Text>

        <View className="device-list">
          {devices.map(device => (
            <View key={device.id} className="device-item">
              <View className="device-icon">
                <AtIcon value={device.icon} size="30" color="#4a90e2" />
              </View>
              <View className="device-info">
                <Text className="device-name">{device.name}</Text>
                <Text className="device-status">{device.status}</Text>
              </View>
              <View className="device-actions">
                <View
                  className="action-btn manage"
                  onClick={() => handleManageDevice(device)}
                >
                  <AtIcon value="settings" size="20" color="#4a90e2" />
                  <Text>管理</Text>
                </View>
                <View
                  className="action-btn delete"
                  onClick={() => handleDeleteDevice(device)}
                >
                  <AtIcon value="trash" size="20" color="#ff4d4f" />
                  <Text>删除</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AllDevice;
