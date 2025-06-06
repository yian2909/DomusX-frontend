type Device = {
  id: number;
  deviceId: string;
  name: string;
  type: number;
  status: number;
};

type DeviceDTO = {
  deviceId: string;
  name: string;
  type: number;
  status: number;
};

type DeviceVO = {
  id: number;
  deviceId: string;
  name: string;
  type: number;
  status: boolean;
  createTime: string; 
};
