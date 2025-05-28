import { useState, useEffect } from 'react'
import { View, Text, Input, Button } from '@tarojs/components'
import { sendCode, mobileLogin, getUserInfo, login } from '@/service/user'
import { isPhoneAvailable, isCodeAvailable } from '@/utils/validate'
import Taro from '@tarojs/taro'
import { setUserInfo } from '@/store/user'
import './index.scss'
import { useAppDispatch } from '@/store'

const Login = () => {
  // 登录方式切换：true为验证码登录，false为密码登录
  const [isCodeLogin, setIsCodeLogin] = useState(true)

  // 密码登录表单
  const [passwordForm, setPasswordForm] = useState({
    username: '',
    password: '',
  })
  //倒计时
  const [count, setCount] = useState(60)
  const [timer, setTimer] = useState(false)
  //登录表单
  const [form, setForm] = useState<MobileLoginDTO>({
    mobile: '15825490503',
    code: '',
  })

  useEffect(() => {
    let interval
    if (timer) {
      interval = setInterval(() => {
        setCount(prevCount => {
          if (prevCount === 1) {
            clearInterval(interval)
            setTimer(false)
            return 60
          }
          return prevCount - 1
        })
      }, 1000)
    }
  }, [timer])

  //发送⼿机验证码
  const sendMobileCode = async () => {
    if (form.mobile && isPhoneAvailable(form.mobile)) {
      setTimer(true)
      const res = await sendCode(form.mobile)
      if (res.code === 0) {
        Taro.showToast({
          title: '验证码发送成功',
          icon: 'success',
        })
      } else {
        Taro.showToast({
          title: '验证码发送失败',
          icon: 'error',
        })
      }
    } else {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
      })
    }
  }
  const dispatch = useAppDispatch()

  const getLoginUserInfo = async () => {
    const res = await getUserInfo()
    if (res.code === 0) {
      dispatch(setUserInfo(res.data))
      console.log(res.data)
      Taro.setStorageSync('user', res.data)
    } else {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
      })
    }
  }

  //⼿机号验证码登录
  const handleLoginClick = async () => {
    //短信登录逻辑
    if (!form.mobile || !isPhoneAvailable(form.mobile)) {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
      })
      return
    }
    if (!form.code || !isCodeAvailable(form.code)) {
      Taro.showToast({
        title: '请输入正确的验证码',
        icon: 'none',
      })
      return
    }
    const res = await mobileLogin(form)
    if (res.code === 0) {
      Taro.setStorageSync('token', res.data.accessToken)
      getLoginUserInfo()
      Taro.showModal({
        title: '登录成功',
        success: () => {
          Taro.switchTab({
            url: '/pages/index/index',
          })
        },
      })
    } else {
      Taro.showToast({
        title: res.msg,
        icon: 'none',
      })
      return
    }
  }

  const handleInputCode = e => {
    setForm({ ...form, code: e.detail.value })
  }

  const handleInputPhone = e => {
    setForm({ ...form, mobile: e.detail.value })
  }

  const handlePasswordLogin = async () => {
    if (!passwordForm.username || !passwordForm.password) {
      Taro.showToast({
        title: '请输入用户名和密码',
        icon: 'none',
      })
      return
    }
    try {
      const res = await login(passwordForm)
      if (res.code === 0) {
        Taro.setStorageSync('token', res.data.accessToken)
        await getLoginUserInfo()
        Taro.showModal({
          title: '登录成功',
          success: () => {
            Taro.switchTab({
              url: '/pages/index/index',
            })
          },
        })
      } else {
        Taro.showToast({
          title: res.msg,
          icon: 'none',
        })
      }
    } catch (error) {
      Taro.showToast({
        title: '登录失败',
        icon: 'none',
      })
    }
  }

  return (
    <View className="loginPage">
      <View className="top">
        <View className="title">{isCodeLogin ? '验证码登录' : '密码登录'}</View>
        <View className="info">
          {isCodeLogin ? '未注册的手机号验证后自动完成注册' : '请输入您的用户名和密码'}
        </View>
      </View>
      <View className="form">
        {isCodeLogin ? (
          <>
            {/* 原有的验证码登录表单 */}
            <Input
              className="input"
              type="text"
              placeholder="请输入手机号"
              value={form.mobile}
              onInput={e => handleInputPhone(e)}
            />
            <View className="code">
              <Input
                className="password"
                type="text"
                password
                placeholder="请输入验证码"
                value={form.code}
                onInput={e => handleInputCode(e)}
              />
              {!timer ? (
                <Text className="btn" onClick={sendMobileCode} hidden={timer}>
                  获取验证码
                </Text>
              ) : (
                <Text className="btn" hidden={!timer}>
                  {count}秒后重发
                </Text>
              )}
            </View>
            <Button className="button" onClick={handleLoginClick}>
              登录
            </Button>
          </>
        ) : (
          <>
            <Input
              className="input"
              type="text"
              placeholder="请输入用户名"
              value={passwordForm.username}
              onInput={e => setPasswordForm({ ...passwordForm, username: e.detail.value })}
            />
            <Input
              className="input"
              type="text"
              password
              placeholder="请输入密码"
              value={passwordForm.password}
              onInput={e => setPasswordForm({ ...passwordForm, password: e.detail.value })}
            />
            <Button className="button" onClick={handlePasswordLogin}>
              登录
            </Button>
          </>
        )}
        <View className="extra">
          <View className="caption">
            <Text>其他登录方式</Text>
          </View>
          <View className="options">
            <Text className="icon icon-weixin">
              <Text className="iconfont icon-weixin-fill" />
              微信一键登录
            </Text>
            <View onClick={() => setIsCodeLogin(!isCodeLogin)} className="icon">
              <Text className="iconfont icon-password" />
              <View>{isCodeLogin ? '用户名密码登录' : '验证码登录'}</View>
            </View>
          </View>
        </View>
        <View className="tips">登录/注册即视为同意《服务条款》和《隐私协议》</View>
      </View>
    </View>
  )
}

export default Login
