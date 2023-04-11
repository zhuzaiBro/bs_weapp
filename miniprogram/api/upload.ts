import request from '../utils/request'

export async function uploadFile(data: any) {
	return new Promise((reslove, reject) => {
		wx.uploadFile({
			url: app.globalData.baseUrl + '/api/upload',//这是你自己后台的连接
			filePath: data.tempFilePath,
			name: "file",//后台要绑定的名称
			header: {
				"Content-Type": "multipart/form-data"
			},
			
			success: function (ress) {
				reslove(ress)
			},
			fail: function (ress) {
				reject(ress)
			}
		})
	})

	// return await request('/api/upload', data, 'POST')
}

export async function submitFeedback(data:any) {
	return await request('/api/feedback', data, 'POST');
}

export async function getVoiceRecognize(bytes: string) {
	return new Promise ((reslove, reject) => {
		wx.request({
			url: 'https://apis.tianapi.com/voicelajifenlei/index', 
			method: 'POST', 
			data: {
			key:'4101b92b0dd1d1264d84e62f299a51ce',say: bytes,format:'pcm'
			}, 
			header: {
			'Content-Type':'application/x-www-form-urlencoded'
			}, 
			success: function (res) {
				reslove(res.data)
			},
			fail(e) {
				reject(e)
			}
		  })
	})
	
}


