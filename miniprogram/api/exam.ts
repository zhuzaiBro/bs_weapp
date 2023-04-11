import request from '../utils/request'

export async function getPaper(query:string) {
	return await request('/api/question/paper' + query, {}, 'GET')
}

export async function ansQuestion(data:any) {
	return await request('/api/question/ans', data, 'POST')
}
