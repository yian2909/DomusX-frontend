import React from "react";
import Taro from "@tarojs/taro";
import { View, Button } from "@tarojs/components";

import "./index.scss";

const Device = () => {
  const handleAdd = () => {
    Taro.navigateTo({
      url: "/pages/addDevice/index",
    });
  };
  const handleEdit = (id: number) => {
    Taro.navigateTo({
      url: `/pages/editDevice/index?deviceId=${id}`,
    });
  };
  
  return (
    <>
      <View>
        <Button onClick={handleAdd}>添加设备</Button>
        {/* 传入的设备id待修改 */}
        <Button onClick={() => handleEdit(1)}>编辑</Button>
      </View>
    </>
  );
};

export default Device;
