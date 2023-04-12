import { getMyTicket } from '../../api/ticket'


Page({

    /**
     * 页面的初始数据
     */
    data: {
        ticketList: [] as any,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.fetchData()
    },

    async fetchData() {
        const res: any = await getMyTicket();
        console.log(res.data)
        const list = res.data.map((it: any) => ({...it, time : this.handleDate(it.createAt)}))
        this.setData({
            ticketList: list
        })
    },

    handleDate(d: string) {
        const date = new Date(d)
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    },
})