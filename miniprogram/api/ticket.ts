import request from '../utils/request'

export async function getMyTicket(query: string = '') {
	return await request("/api/ticket/" + query, {}, 'GET')
}
