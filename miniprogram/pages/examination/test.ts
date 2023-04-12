import { getPaper, ansQuestion } from '../../api/exam'

const questionType = {
    'select': "选择题",
    'judge': "判断题"
}

Page({
    data: {
        questions: [] as any[],
        currnetIndex: 0,
        typeMap: questionType,
        anslist: [] as any[],
        result: {
            score: 0,
            isSubmit: false
        }
    },
    async onLoad() {
        const res: any = await getPaper('')
        // console.log(res.data)
        const newArr = []
        for (let i = 0; i < res.data.length; i++) {
            newArr.push('')
        }
        this.setData({
            questions: res.data,
            anslist: newArr
        })
    },
    onReady() {

    },
    onShow() {

    },
    onHide() {

    },
    onUnload() {

    },
    handleChoose(e: WechatMiniprogram.TapEvent) {
        // 修改
        const index = +e.currentTarget.dataset.index
        const ans = e.currentTarget.dataset.ans;

        this.data.questions[index].uanswer = ans
        const arr = this.data.questions
  
        this.setData({ questions: arr })
  
    },
    handleSwiper(e: WechatMiniprogram.TouchEvent) {
        if (this.data.currnetIndex != e.detail.current) {
            this.setData({
                currnetIndex: e.detail.current
            })
        }

    },
    handleNext() {
        this.setData({
            currnetIndex: this.data.currnetIndex + 1
        })
    },
    handlePrev() {
        this.setData({
            currnetIndex: this.data.currnetIndex - 1
        })
    },
    async submit() {
        const res:any = await ansQuestion(this.data.questions)
        console.log(res.data)
        this.setData({
            result: {
                isSubmit: true,
                score: res.data
            }
        })
        wx.showModal({
            title: "考试结束",
            content: `您的得分是${res.data}分`,
            success() {
                wx.reLaunch({
                    url: "/pages/mine/mine"
                })
            }
        })
    },
    confirmSubmit() {
        var that = this
        wx.showModal({
            title: "是否确认提交",
            content: "提交后，将批改您的答卷，积分会自动到账",
            success() {
                // 用户确认提交
                that.submit()
            }
        })
    }
})