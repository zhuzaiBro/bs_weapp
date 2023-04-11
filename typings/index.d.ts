/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    baseUrl?:string,
    code?:string,
    lineHeight:number,
    marginTop:number,
    token: string,
    userInfo: object,
    currentArticle?: any,
    content?: string
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}