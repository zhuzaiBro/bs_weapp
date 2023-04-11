// pages/knowledge/konwledge.ts
import { getArticles } from '../../api/article'
const k_a = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        article_list: [],
        isLow: false,
        marginTop: k_a.globalData.marginTop,
        lineHeight: k_a.globalData.lineHeight
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        const that = this
        const res: any = await getArticles('');
        that.setData({
            article_list: res.data //返回内容更新到视图层{{tianapi_data}}
        })
      
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
        return {
        
        }
    },
    goArticle(item: WechatMiniprogram.BaseEvent) {
        // console.log(item.currentTarget.dataset.item)
        getApp().globalData.currentArticle = item.currentTarget.dataset.item
        getApp().globalData.content = item.currentTarget.dataset.item.content
        // const data = JSON.stringify()
        wx.navigateTo({
            url: `/pages/article/article`,
            // events: item
        })
    },
    onPageScroll(e: WechatMiniprogram.Page.IPageScrollOption) {
        if (e.scrollTop > 150) {
            this.setData({
                isLow: true
            })
        } else {
            this.setData({
                isLow: false
            })
        }
        // console.log(e.scrollTop)
    }
})