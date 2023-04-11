import {getUserInfo} from '../../api/user'


Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

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

    getUserProfile() {
        const that = this
        wx.getUserProfile({
            desc: "用于登录",
            fail(err) {
                console.log(err)
            },
            success(res) {
                // 调用wx登录接口
                console.log(res, getApp())
                wx.request({
                    url: getApp().globalData.baseUrl + "/api/user/login?",
                    method: "POST",
                    data: {
                        code: getApp().globalData.code,
                        iv: res.iv,
                        encryptedData: res.encryptedData
                    },
                    success: async (resp: any)=> {
                        wx.setStorageSync('token', resp.data.token)
                        getApp().globalData.token = resp.data.token 
                        
                        const uData:any = await getUserInfo()
                        // console.log(uData.data)
                        getApp().globalData.userInfo = uData.data;
                        wx.reLaunch({
                            url: '/pages/index/index'
                        })
                        wx.login({
                            success(codeData) {
                                getApp().globalData.code = codeData.code
                            }
                        })
                    }
                })

                // console.log(resp, "reps")
            }
        })

    }
})