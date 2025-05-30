import React from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";

const editDevice = () => {
  const { deviceId } = Taro.getCurrentInstance().router.params;
  return (
    <>
      <View>
        <View>正在编辑设备的id：{deviceId}</View>
      </View>
    </>
  );
};

export default editDevice;
