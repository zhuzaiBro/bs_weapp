import {fetchGoods} from '../../api/integral'
import { getUserInfo } from '../../api/user'


Page({
    data: {
        integralGoods: [] as any[],
        screenHeight: wx.getSystemInfoSync().screenHeight,
        marginTop: getApp().globalData.marginTop,
        lineHeight: getApp().globalData.lineHeight,
        userInfo: {}, 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        this.fetchData()
        const res:any = await getUserInfo()
        this.setData({
            userInfo: res.data
        })
    },

    goDetail() {
        wx.navigateTo({
            url: "/pages/integral/integralList"
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    async fetchData() {
        const query = '?page=1&size=10&order=desc'
        const res:any = await fetchGoods(query)
        console.log(res)
        this.setData({
            integralGoods: res.data
        })
    },

    goback() {
        wx.navigateBack()
    },
    goGood(e : WechatMiniprogram.TapEvent) {
        wx.navigateTo({
            url: '/pages/integralGoods/integralCon?data=' + JSON.stringify( e.currentTarget.dataset.item)
        })
        
       
    }
})