import React, { useState } from "react";
import { View, Text, Input } from "@tarojs/components";
import { useAppSelector } from "@/store";
import { addDevice, getDevice } from "@/service/device";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import "./index.scss";

const AddDevice = () => {
  const [deviceName, setDeviceName] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("star");
  const userInfo = useAppSelector((state) => state.user.userInfo);

  const icons = [
    { value: "star", name: "智能灯光" },
    { value: "shopping-bag", name: "植物监控" },
    { value: "lock", name: "智能门锁" },
    { value: "heart", name: "宠物喂食器" },
  ];

  const handleBack = () => {
    Taro.navigateBack();
  };

  const handleScan = () => {
    Taro.scanCode({
      success: (res) => {
        console.log(res);
        Taro.showToast({
          title: "扫描成功",
          icon: "success",
          duration: 2000,
        });
      },
    });
  };

  const handleSubmit = async () => {
    if (!deviceId) {
      Taro.showToast({
        title: "请输入设备编号",
        icon: "none",
        duration: 2000,
      });
      return;
    }

    if (!deviceName) {
      Taro.showToast({
        title: "请输入设备名称",
        icon: "none",
        duration: 2000,
      });
      return;
    }

    try {
      const res = await getDevice(deviceId);
      const device = res.data.id;
      if (await addDevice(userInfo.id, device)) {
        Taro.showToast({
          title: "添加成功",
          icon: "success",
          duration: 2000,
        });
        setTimeout(() => {
          Taro.navigateBack();
        }, 2000);
      }
    } catch (error) {
      console.error("设备添加失败:", error);
    }
  };

  return (
    <View className="container">
      <View className="content">
        {/* <View className="scan-section">
          <Text className="scan-title">扫描设备二维码</Text>
          <View className="scan-box" onClick={handleScan}>
            <View className="scan-icon">
              <AtIcon value="scan" size="48" color="#4a90e2" />
            </View>
            <Text className="scan-text">将二维码放入框内扫描</Text>
          </View>
        </View> */}

        <View className="form-section">
          <View className="form-group">
            <Text>设备编号</Text>
            <Input
              className="form-input"
              placeholder="请输入设备编号"
              value={deviceId}
              onInput={(e) => setDeviceId(e.detail.value)}
            />
          </View>
          <View className="form-group">
            <Text className="form-label">设备名称</Text>
            <Input
              className="form-input"
              placeholder="请输入设备名称"
              value={deviceName}
              onInput={(e) => setDeviceName(e.detail.value)}
            />
          </View>

          <View className="form-group">
            <Text className="form-label">选择图标</Text>
            <View className="icon-select">
              {icons.map((icon) => (
                <View
                  key={icon.value}
                  className={`icon-option ${selectedIcon === icon.value ? "selected" : ""}`}
                  onClick={() => setSelectedIcon(icon.value)}
                >
                  <AtIcon
                    value={icon.value}
                    size="20"
                    color={selectedIcon === icon.value ? "#fff" : "#4a90e2"}
                  />
                </View>
              ))}
            </View>
          </View>

          <View className="submit-btn" onClick={handleSubmit}>
            添加设备
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddDevice;
