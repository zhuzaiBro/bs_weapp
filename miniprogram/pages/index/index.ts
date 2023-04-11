
const list = [
  { url: 'https://p3.ssl.qhimgs1.com/sdr/400__/t0199413ff0db751a53.png' },
  { url: 'https://p1.ssl.qhimgs1.com/sdr/400__/t01a4074d8117c9bc4b.jpg' },
  { url: 'https://p3.ssl.qhimgs1.com/sdr/400__/t01f0442fd89345d0bd.jpg' }

]
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserProfile'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false, 
    imgUrls: list as any[],
    currnetIndex: 0
  },

  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    // @ts-ignore
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

    console.log(this.data.imgUrls)

    this.setData({
      imgUrls: list,
      userInfo: getApp().globalData.userInfo
    })
  },
  getUserProfile() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e: any) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },



  goRecognize(e: WechatMiniprogram.TapEvent) {
    wx.navigateTo({
      url: '/pages/recognize/recognize?type=' + e.currentTarget.dataset.type,

    })
  }

})
