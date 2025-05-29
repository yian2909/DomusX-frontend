import React from "react";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
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
      <View className="bg">
        <View className="add">
          <Button onClick={handleAdd} className="addbtn">
            <AtIcon value="add" color="white"></AtIcon>
            添加设备
          </Button>
        </View>

        <View className="font">我的设备</View>
        <View className="list">
          {/* 传入的设备id待修改 */}
          <Button onClick={() => handleEdit(1)}>编辑</Button>
        </View>
      </View>
    </>
  );
};

export default Device;
