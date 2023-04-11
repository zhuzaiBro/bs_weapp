// pages/article/article.ts
var WxParse = require('../../wxParse/wxParse.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: "",
        nodes:"",
        article: {},
        picUrl: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e:any) {
        var that = this
        const articleData = getApp().globalData.currentArticle
        // console.log(articleData)
        
        this.setData({
            article: getApp().globalData.content,
            picUrl: articleData.picUrl
        })
        WxParse.wxParse('article', 'html', this.data.article, that, 9);

        // wx.request({
        //     url: articleData.url,
        //     success(res) {
        //         console.log(res.data)
        //         that.setData({
        //             nodes: res.data as any
        //         })
        //         const a = 'adsa\
        //         ![](https://homework-1309397063.cos.ap-shanghai.myqcloud.com/upload/f41c6ebe-3ecc-4b06-8cdc-c745271a8c91.png) >  撒大苏打水水'
        //         WxParse.wxParse('article', 'md', a, that, 9);
        //         // console.log(that.data)
        //     }
        // })
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

    }
})