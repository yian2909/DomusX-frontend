import { http } from "@/utils/http";
import type { WateringStatusVO, EnvironmentDataVO } from "@/types/plant";

const plantService = {
  setWateringThreshold: (deviceId: string, threshold: number) => {
    return http<string>({
      method: "POST",
      url: `/iot/api/plant/watering/threshold?deviceId=${deviceId}&threshold=${threshold}`,
    });
  },

  setAutoWatering: (deviceId: string, enabled: "on" | "off") => {
    return http<string>({
      method: "POST",
      url: `/iot/api/plant/watering/auto?deviceId=${deviceId}&enabled=${enabled}`,
    });
  },

  manualWatering: (deviceId: string, command: string) => {
    return http<string>({
      method: "POST",
      url: `/iot/api/plant/watering/manual?deviceId=${deviceId}&command=${command}`,
    });
  },

  getWateringStatus: (deviceId: string) => {
    return http<WateringStatusVO>({
      method: "GET",
      url: `/iot/api/plant/watering/status?deviceId=${deviceId}`,
    });
  },

  getEnvironmentData: (deviceId: string) => {
    return http<EnvironmentDataVO>({
      method: "GET",
      url: `/iot/api/plant/watering/environment?deviceId=${deviceId}`,
    });
  },
};

export const {
  setWateringThreshold,
  setAutoWatering,
  manualWatering,
  getWateringStatus,
  getEnvironmentData,
} = plantService;
