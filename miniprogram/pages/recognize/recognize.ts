// pages/recognize/recognize.ts
import {getVoiceRecognize} from '../../api/upload'
const recorderManager = wx.getRecorderManager()
const app = getApp<IAppOption>()

const typeMapInfo = {
    0: '语音',
    1: '拍照',
    2: '文字'
}

Page({
    data: {
        openRecordingdis: "block",//录音图片的不同
        shutRecordingdis: "none",//录音图片的不同
        recordingTimeqwe: 0,//录音计时
        setInter: 1,//录音名称
        result: [] as any[],
        typeMap: typeMapInfo,
        currentIndex: 0,
        isRecording: false,
        word: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(e: any) {
        if (e.type !== void 0) {
            this.setData({
                currentIndex: +e.type
            })
        }
    },
    //录音计时器
    recordingTimer() {
        var that = this;
        //将计时器赋值给setInter
        that.data.setInter = setInterval(
            function () {
                var time = that.data.recordingTimeqwe + 1;
                that.setData({
                    recordingTimeqwe: time
                })
            }
            , 1000);
    },
    //开始录音
    openRecording() {
        var that = this;
        that.setData({
            isRecording: true
        })
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    shutRecordingdis: "block",
                    openRecordingdis: "none"
                })
            }
        })
        const options: WechatMiniprogram.RecorderManagerStartOption = {
            duration: 60000, //指定录音的时长，单位 ms，最大为10分钟（600000），默认为1分钟（60000）
            sampleRate: 16000, //采样率
            numberOfChannels: 1, //录音通道数
            encodeBitRate: 96000, //编码码率
            format: 'mp3', //音频格式，有效值 aac/mp3
            frameSize: 50, //指定帧大小，单位 KB
        }
        //开始录音计时
        that.recordingTimer();
        //开始录音
        recorderManager.start(options);
        recorderManager.onStart(() => {
            console.log(that.data.isRecording)
        });
        //错误回调
        recorderManager.onError((res) => {
            console.log(res);
        })
    },
    //结束录音
    shutRecording() {
        var that = this;
        this.setData({
            isRecording: false
        })
        wx.getSystemInfo({
            success: function () {
                that.setData({
                    shutRecordingdis: "none",
                    openRecordingdis: "block"
                })
            }
        })
        recorderManager.stop();
        recorderManager.onStop((res) => {
            // console.log('。。停止录音。。', res.tempFilePath)
            const { tempFilePath } = res;
            //结束录音计时
            clearInterval(that.data.setInter);
            //上传录音

            // let base64 = wx.getFileSystemManager().readFileSync(tempFilePath, "base64")
            // getVoiceRecognize(base64 as any).then(r => {
            //     console.log(r)
            // }).catch(e =>  {
            //     console.log(e)
            // })
            wx.uploadFile({
                url: app.globalData.baseUrl + '/voice/recognize',//这是你自己后台的连接
                filePath: tempFilePath,
                name: "file",//后台要绑定的名称
                header: {
                    "Content-Type": "multipart/form-data;charset=utf-8"
                },
                //参数绑定
                formData: {
                    recordingtime: that.data.recordingTimeqwe,
                    userid: 1,
                    praisepoints: 0
                },
                success: function (ress) {
                    console.log(res, ress.data);
                    that.setData({
                        word: JSON.parse(ress.data).data.Result
                    })
                    that.getResult()
                    wx.showToast({
                        title: '识别完成',
                        icon: 'success',
                        duration: 2000
                    })
                },
                fail: function (ress) {
                    console.log("。。录音保存失败。。");
                }
            })
        })
    },

    handleSwiper({ detail }: WechatMiniprogram.SwiperChange) {
        if (detail.current != this.data.currentIndex) {
            this.setData({
                currentIndex: detail.current,

            })
        }
    },
    // 拍照识别
    recognizeType() {
        const that = this;
        wx.chooseImage({
            success(res) {
                console.log(res.tempFilePaths[0])
                // 图片转码base64
                wx.getFileSystemManager().readFile({
                    filePath: res.tempFilePaths[0], //选择图片返回的相对路径
                    encoding: 'base64', //编码格式
                    success: code => { //成功的回调
                        // console.log('data:image/png;base64,' + code.data)
                        wx.request({
                            url: 'https://apis.tianapi.com/imglajifenlei/index',
                            method: 'POST',
                            data: {
                                key: '4101b92b0dd1d1264d84e62f299a51ce', img: code.data
                            },
                            header: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            success: function (res: any) {
                                console.log(res.data)
                                that.setData({
                                    result: res.data.result.list
                                })
                            },
                            fail: function (err) {
                                console.log(err)
                            }
                        })
                    }
                })

            }
        })
    },

    // 点击识别
    getResult(keyword?: any) {
        const that = this;
        // console.log(keyword,  that.data.word)
        wx.request({
            url: 'https://apis.tianapi.com/lajifenlei/index',
            method: 'POST',
            data: {
                key: '4101b92b0dd1d1264d84e62f299a51ce', word: that.data.word
            },
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res: any) {
                console.log(res.data)
                that.setData({
                    result: res.data.result.list
                })
            },
            fail: function (err) {
                console.log(err)
            }
        })
    }
})