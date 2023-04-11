import { handleExchange } from '../../api/integral'

var WxParse = require('../../wxParse/wxParse.js');



Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodInfo: {
            content: ""
        } as any,
        content: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e: any) {
        console.log(e)
        console.log(JSON.parse(e.data))
        this.setData({
            goodInfo: JSON.parse(e.data)
        })

        WxParse.wxParse('content', 'md', this.data.goodInfo.content, this, 9);
        console.log(this.data)
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
    confirmExchange() {
        var that = this;
        wx.showModal({
            title: "是否确认兑换？",
            content: "兑换商品",
            success() {
                that.handleExchange().then(res => {
                    
                })
                wx.redirectTo({
                    url: "/pages/mine/mine"
                })
            }
        });
    },
    async handleExchange() {
        const form = {
            goodId: this.data.goodInfo.id,

        }
        console.log(form)
        const res = await handleExchange(form)
        console.log(res)

    }
})