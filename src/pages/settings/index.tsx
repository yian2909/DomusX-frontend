import React, { useState, useEffect } from "react";
import { View, Text, Input, Image, Picker } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { AtIcon } from "taro-ui";
import { useAppSelector, useAppDispatch } from "@/store";
import { setUserInfo } from "@/store/user";
import { getUserInfo, updateUser } from "@/service/user";
import "./index.scss";

const Settings = () => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [formData, setFormData] = useState({
    nickname: "",
    avatar: "",
    gender: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const genderOptions = [
    { value: 0, label: "男" },
    { value: 1, label: "女" },
    { value: 2, label: "保密" },
  ];

  useEffect(() => {
    if (userInfo.id > 0) {
      setFormData({
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        gender: userInfo.gender,
      });
    }
  }, [userInfo]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenderChange = (e: any) => {
    setFormData((prev) => ({
      ...prev,
      gender: Number(e.detail.value),
    }));
  };

  const handleChooseAvatar = async () => {
    try {
      const res = await Taro.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
      });

      if (res.tempFilePaths && res.tempFilePaths[0]) {
        // TODO: 上传图片到服务器，获取URL
        // 这里暂时使用本地路径
        setFormData((prev) => ({
          ...prev,
          avatar: res.tempFilePaths[0],
        }));
      }
    } catch (error) {
      Taro.showToast({
        title: "选择头像失败",
        icon: "error",
      });
    }
  };

  const handleSave = async () => {
    if (!formData.nickname.trim()) {
      Taro.showToast({
        title: "昵称不能为空",
        icon: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const res = await updateUser({
        id: userInfo.id,
        ...formData,
      });

      // 直接更新本地状态，不再重新获取用户信息
      dispatch(setUserInfo({
        ...userInfo,
        ...formData,
      }));

      Taro.showToast({
        title: "保存成功",
        icon: "success",
      });
    } catch (error) {
      Taro.showToast({
        title: "保存失败",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="settings-container">
      <View className="settings-form">
        <View className="form-item avatar-item" onClick={handleChooseAvatar}>
          <Text className="label">头像</Text>
          <View className="avatar-wrapper">
            {formData.avatar ? (
              <Image className="avatar" src={formData.avatar} mode="aspectFill" />
            ) : (
              <View className="avatar-placeholder">
                <AtIcon value="user" size="40" color="#999" />
              </View>
            )}
            <View className="edit-icon">
              <AtIcon value="edit" size="20" color="#4a90e2" />
            </View>
          </View>
        </View>

        <View className="form-item">
          <Text className="label">昵称</Text>
          <Input
            className="input"
            value={formData.nickname}
            onInput={(e) => handleInputChange("nickname", e.detail.value)}
            placeholder="请输入昵称"
          />
        </View>

        <View className="form-item">
          <Text className="label">性别</Text>
          <Picker
            mode="selector"
            range={genderOptions}
            rangeKey="label"
            value={formData.gender}
            onChange={handleGenderChange}
            className="gender-picker"
          >
            <View className="picker">
              <Text>{genderOptions.find(opt => opt.value === formData.gender)?.label || "未设置"}</Text>
              <AtIcon value="chevron-right" size="20" color="#999" />
            </View>
          </Picker>
        </View>

        <View className="form-item">
          <Text className="label">手机号</Text>
          <Text className="readonly-text">{userInfo.mobile}</Text>
        </View>
      </View>

      <View className="settings-footer">
        <View
          className={`save-button ${isLoading ? 'loading' : ''}`}
          onClick={handleSave}
        >
          {isLoading ? "保存中..." : "保存修改"}
        </View>
      </View>
    </View>
  );
};

export default Settings;
