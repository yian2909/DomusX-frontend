export type WateringThresholdDTO = {
  deviceId: string;
  threshold: number;
};

export type AutoWateringDTO = {
  deviceId: string;
  enabled: boolean;
};

export type ManualWateringDTO = {
  deviceId: string;
  command: string;
};

export type WateringStatusVO = {
  threshold: number;
  autoMode: boolean;
};

export type EnvironmentDataVO = {
  deviceId: string;
  temperature: number;
  humidity: number;
  timestamp: string;
};
