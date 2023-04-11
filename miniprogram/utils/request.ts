
type Method = "GET" | "OPTIONS" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined


export default (url: string, data = {}, method: Method = 'GET', needToken = true) => {
	const header = {
		'content-type': 'application/json', // 默认值
		'Authorization': needToken ? wx.getStorageSync("token"): ''
	}
	return new Promise((resolve, reject) => {
		// 1. new Promise初始化promise实例的状态为pending
		wx.request({
			url: getApp().globalData.baseUrl + url,
			data,
			method,
			header,
			success: (res:any) => {
				if(res.data.code == 200) {
					resolve(res.data); // resolve修改promise的状态为成功状态resolved
				} else if (res.data.code == 401) {
					// 登录过期
					wx.clearStorageSync();
					wx.showModal({
						title: '登录过期',
						content: '请重新授权登录',
						success() {
							wx.navigateTo({
								url: "/pages/login/login"
							})
						}
					})
				}
			},
			fail: (err) => {
				console.log('请求失败: ', err);
				reject(err); // reject修改promise的状态为失败状态 rejected
			}
		})
	})

}

