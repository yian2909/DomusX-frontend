import { http } from "@/utils/http";

//智能灯电源控制
export const setSwitch = (deviceId: string, value: number) => {
  return http<string>({
    method: "POST",
    url: `/iot/api/light/control/setPower?deviceId=${deviceId}&value=${value}`,
  });
};

//智能灯光线阈值设置
export const setThreshold = (deviceId: string, value: number) => {
  return http<string>({
    method: "POST",
    url: `/iot/api/light/control/setThreshold?deviceId=${deviceId}&value=${value}`,
  });
};

//智能灯声控模式设置
export const setSoundSensor = (deviceId: string, value: number) => {
  return http<string>({
    method: "POST",
    url: `/iot/api/light/control/setSoundSensor?deviceId=${deviceId}&value=${value}`,
  });
};

//智能灯光控模式设置
export const setLightCmd = (deviceId: string, value: number) => {
  return http<string>({
    method: "POST",
    url: `/iot/api/light/control/setLightSensor?deviceId=${deviceId}&value=${value}`,
  });
};

//智能灯自动模式设置
export const setAuto = (deviceId: string, value: number) => {
  return http<string>({
    method: "POST",
    url: `/iot/api/light/control/setAutoMode?deviceId=${deviceId}&value=${value}`,
  });
};

//智能灯灯光颜色设置
export const setColor = (deviceId: string, value: number) => {
  return http<string>({
    method: "POST",
    url: `/iot/api/light/control/setColor?deviceId=${deviceId}&value=${value}`,
  });
};
