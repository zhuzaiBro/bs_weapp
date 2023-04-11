import request from '../utils/request';

export async function getArticles(query: string) {
	return await request('/api/article/' + query, {}, 'GET', false)
}

