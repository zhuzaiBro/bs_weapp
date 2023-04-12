import {getTodayRel} from "../../api/integral"
import {getUserInfo} from "../../api/user"


Page({

    /**
     * 页面的初始数据
     */
    data: {
        integralList: [],
        userInfo: getApp().globalData.userInfo,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        var that = this
        getTodayRel({}).then((res:any) => {
            const list = res.data.map((it: any)=> {
                return {
                    ...it, 
                    time: that.handleDate(it.createTime)
                }
            })
            this.setData({
                integralList: list
            })
        })

        getUserInfo().then((r: any) => {
            that.setData({
                userInfo: r.data
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

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    handleDate(d: string) {
        const date = new Date(d)
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    },

    goTest() {
        wx.redirectTo({
            url: '/pages/examination/examination'
        })
    }
})