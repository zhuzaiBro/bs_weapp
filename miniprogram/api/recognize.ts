import request from "../utils/request"

export async function getResult(word:string) {
	return await request(
		'https://apis.tianapi.com/lajifenlei/index?key=APIKEY&word=眼镜'
	)
}
