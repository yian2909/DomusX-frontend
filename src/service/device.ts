import { http } from "@/utils/http";

//根据ID获取单个设备
export const getDevice = (id: string) => {
  return http<Device>({
    method: "GET",
    url: `/iot/api/device/${id}`,
  });
};

//获取用户所有设备（没加分页和筛选条件，后面有需要再加）
export const getAll = (id: number) => {
  return http<DeviceVO[]>({
    method: "GET",
    url: `/iot/api/user/getAll?userId=${id}`,
  });
};

//新增设备
export const addDevice = (userId: number, deviceId: number) => {
  return http<null>({
    method: "POST",
    url: `/iot/api/user/save?userId=${userId}&deviceId=${deviceId}`,
  });
};

//设备解绑
export const deleteDevice = (userId: number, deviceId: number) => {
  return http<null>({
    method: "POST",
    url: `/iot/api/user/unBind?userId=${userId}&deviceId=${deviceId}`,
  });
};
