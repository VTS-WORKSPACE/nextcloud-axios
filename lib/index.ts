import Axios, { AxiosInstance, CancelTokenStatic } from 'axios'
import { getRequestToken, onRequestTokenUpdate } from '@nextcloud/auth'

interface CancelableAxiosInstance extends AxiosInstance {
	CancelToken: CancelTokenStatic
	isCancel(value: any): boolean
}

const client: AxiosInstance = Axios.create({
	headers: {
		requesttoken: getRequestToken()
	}
})
// [VWORKSPACE] Change all method such as PUT, DELETE, MOVE ... to POST
client.interceptors.request.use(function (config) {
	if(config.method) {
		let method = config.method.toUpperCase();
		// Change all request except POST GET HEAD to POST
		if(method !== 'POST' && method !== 'GET' && method !== 'HEAD') {
			config.headers['Target-Request-Method'] = method;
			config.method = 'post';
			console.log("Axios overide: ", config.headers);
		}
	}
	return config;
  }, function (error) {
	return Promise.reject(error);
});
const cancelableClient: CancelableAxiosInstance = Object.assign(client, {
	CancelToken: Axios.CancelToken,
	isCancel: Axios.isCancel,
})

onRequestTokenUpdate(token => client.defaults.headers.requesttoken = token)

export default cancelableClient
