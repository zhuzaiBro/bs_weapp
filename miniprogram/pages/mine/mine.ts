import {getTodayRel} from '../../api/integral'

var a = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            nickName: "",
            openId: "",
            avatarUrl: "https://cdn.discosoul.com.cn/farm-13093970634ecbf1db7b38416a98245221fb9532df.png"
        },
        marginTop: a.globalData.marginTop,
        lineHeight: a.globalData.lineHeight,
        screenHeight: 800,
        todayRel: [],
        isStudy: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
       const sysData = wx.getSystemInfoSync()
       this.setData({
           screenHeight: sysData.windowHeight
       })
       getTodayRel({}).then((res: any) => {
           console.log(res.data)
           const isOK = res.data.reduce((it: any) => it.info=='答题获得奖励')
           this.setData({
               todayRel: res.data,
               isStudy: true
           })
       })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // 刷新 userInfo 字段

        this.setData({
            userInfo: getApp().globalData.userInfo
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        console.log('我消失了')
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    goLogin() {
        wx.navigateTo({
            url: '/pages/login/login'
        })
    },
    goIntegral() {
       
        wx.navigateTo({
            url: '/pages/integralGoods/integralList'
        })
    },
    goFeedback() {
        wx.navigateTo({
            url: '/pages/feedback/feedback'
        })
    },
    goTest() {
        wx.switchTab({
            url: '/pages/examination/examination'
        })
    },
    goIntegralList() {
        wx.navigateTo({
            url: '/pages/integral/integralList'
        })
    }
})