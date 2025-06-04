import { http } from "@/utils/http";

//根据ID获取单个设备
export const getDevice = (id: number) => {
  return http<Device>({
    method: "GET",
    url: `/iot/api/device/${id}`,
  });
};

//获取所有设备（没加分页和筛选条件，后面有需要再加）
export const getAll = () => {
  return http<Device>({
    method: "GET",
    url: "/iot/api/device",
  });
};

//新增设备
export const addDevice = (data: DeviceDTO) => {
  return http<Device>({
    method: "POST",
    url: "/iot/api/device/save",
    data,
  });
};

//发送指令（灯专用）
export const commandLight = (
  deviceId: string,
  command: string,
  value: number,
) => {
  return http<null>({
    method: "POST",
    url: `/iot/api/device/control?deviceId=${deviceId}&command=${command}&value=${value}`,
  });
};

//发送指令
export const command = (deviceId: string, command: string) => {
  return http<null>({
    method: "POST",
    url: `/iot/api/device/control?deviceId=${deviceId}&command=${command}`,
  });
};
