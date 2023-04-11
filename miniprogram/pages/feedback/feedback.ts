import {uploadFile, submitFeedback} from '../../api/upload'



Page ({

    /**
     * 页面的初始数据
     */
    data: {
        imageList: [],
        content: ''
    },
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
    // 添加图片
    async _addImage() {
        const that = this;
        const count = 5 - this.data.imageList.length
        wx.chooseImage({
            count,
            success: ({tempFilePaths, tempFiles}) => {
                tempFilePaths.forEach((url, index) => {
                    if (index < count) {
                        let imageList = that.data.imageList as any[]
                        
                        that.setData({
                            imageList: imageList.concat([{
                                url,
                                name: tempFiles[index].path || Date.now().toString() + tempFilePaths[0].substr(tempFilePaths[0].lastIndexOf('.'))
                            }]) as any
                        })
                        console.log(that.data.imageList)
                    }
                })
            }
        })
    },
    // 发送意见反馈的内容
    async _submitFeedback() {
        if (!this.data.content) {
            wx.showToast({
                title: '文本内容不能为空',
                icon: 'none'
            })
            return
        }
        // 上传我们的图片
        wx.showLoading({
            title: '正在上传'
        })

        const feedbackImageList = await Promise.all(this.getFiledId())

        wx.hideLoading()
        const data = await submitFeedback({
            content: this.data.content,
            feedbackImageList
        })
        
        wx.showToast({
            title: (data as any).msg
        })
        setTimeout(() => {
            wx.switchTab({
                url: '/pages/mine/mine'
            })
        }, 1500)
    },
    // 删除图片
    delImage(e:WechatMiniprogram.TapEvent) {
        const imageList = this.data.imageList
        const index = +e.currentTarget.dataset.index
        console.log(e.currentTarget)
        this.setData({
            imageList: imageList.slice(0, index).concat(imageList.slice(index + 1, imageList.length))
        })
        
    },
    // 获取图片上传的地址
    getFiledId() {
        return this.data.imageList.map((it: any) => {
            return new Promise(async resolve => {
                const result = await uploadFile({
                    filePath: it.url,
                    cloudPath: it.name
                })
                
                resolve(result)
            })
        })
    }
})