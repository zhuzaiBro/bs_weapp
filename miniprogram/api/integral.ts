import request from '../utils/request'



export async function fetchGoods(query: string) {
	return await request("/api/integral/goods" + query, {} , 'GET', false)
}

export async function getTodayRel(data:any) {
	return await request("/api/integral/rel", {}, 'POST')
}

export async function handleExchange(data: any) {
	return await request("/api/integral/exchange", data, 'POST')
}

