import { http } from "@/utils/http";

export const controlLock = (deviceId: string, command: string) => {
  return http<string>({
    method: "POST",
    url: `/iot/api/lock/control?deviceId=${deviceId}&command=${command}`,
  });
};

export const controlTouch = (deviceId: string, command: string) => {
  return http<string>({
    method: "POST",
    url: `/iot/api/lock/touch?deviceId=${deviceId}&command=${command}`,
  });
};

export const controlSensor = (deviceId: string, command: string) => {
  return http<string>({
    method: "POST",
    url: `/iot/api/lock/sensor?deviceId=${deviceId}&command=${command}`,
  });
};

export const sendCommand = (data: DeviceDTO) => {
  return http<DeviceVO>({
    method: "POST",
    url: `/api/device/control`,
    data,
  });
};
