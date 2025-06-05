type MobileLoginDTO = {
  mobile: string
  code: string
}
type AccountLoginDTO = {
  username: string
  password: string
}
type MobileLoginVO = {
  id: number
  mobile: string
  accessToken: string
}
type UserVO = {
  id: number
  mobile: string
  nickname: string
  avatar: string
  gender: number
  createTime: string
}
type UserDTO = {
  id: number;
  nickname: string;
  avatar: string;
  gender: number;
};

type UserVO = {
  id: number;
  mobile: string;
  nickname: string;
  avatar: string;
  gender: number;
  createTime: string;
};

type MobileLoginDTO = {
  mobile: string;
  code: string;
};

type MobileLoginVO = {
  id: number;
  mobile: string;
  accessToken: string;
};

type AccountLoginDTO = {
  username: string;
  password: string;
};
