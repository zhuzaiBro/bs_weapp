// pages/examination/examination.ts
const examination_a = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        marginTop: examination_a.globalData.marginTop,
        lineHeight: examination_a.globalData.lineHeight,
        examination_list: [
           
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        const arr:any = [];
        for (let i = 0; i < 8; i++) {
            arr.push( {
                title: "环保篇"+i,
                icon: "https://cdn.discosoul.com.cn/farm-1309397063090ece38b0f349e4a0631eac596dbb3a.png"
            })
        }
        this.setData({
            examination_list: arr
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

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },
    goExam() {
        wx.navigateTo({
            url: '/pages/examination/test'
        })
    }
})