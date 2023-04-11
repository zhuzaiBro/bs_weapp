import {getUserInfo} from './api/user'

App<IAppOption>({
  globalData: {
    baseUrl: "http://172.20.10.3:8899",
    // baseUrl: "https://www.discosoul.com.cn/school",
    code: "",
    marginTop: 34,
    lineHeight: 30,
    token: '',
    userInfo: {},
    currentArticle: {},
    content:''
  },
  onLaunch() {
   const that = this;
  
    // 登录
    wx.login({
      success: res => {
        // console.log(res.code)
        that.globalData.code = res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })

    const token = wx.getStorageSync('token')
    this.globalData.token = token;

    const size = wx.getMenuButtonBoundingClientRect()
    this.globalData.lineHeight = size.height,
      this.globalData.marginTop = size.top

  },
  onShow() {
    const that = this;

    setTimeout(async() => {
      const info:any = await getUserInfo()
      // console.log(info)
      if(info.code == 200) {
        that.globalData.userInfo = info.data
      }
    }, 100);
  }
})