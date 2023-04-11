// components/authorization/index.js
Component({
    data: {
      isFlag: false,
    },
    // 生命周期函数
    lifetimes: {
      attached() {
        // 登录状态
        const isFlag= !!getApp().globalData.token
        // 记录登录状态
        this.setData({ isFlag})
        // 未登录重定向到登录页
        if (!isFlag) {
          // 引导用户到登录页面
          wx.redirectTo({
            url: `/pages/login/login`,
          })
        }
      },
    },
  })