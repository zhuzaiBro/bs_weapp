// components/appbar.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: String,
            default: ''
        },
        bg_color: {
            type: String,
            default: 'transparent'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        marginTop: getApp().globalData.marginTop,
        lineHeight: getApp().globalData.lineHeight
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
}) 
