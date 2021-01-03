import axios from 'axios';
import _ from "lodash";

class AxiosService {
  constructor(){
		//tạo instance (thực thể) thuộc axios
		const instance = axios.create({
			headers: {
				"Content-Type": "application/json",
			},
		});
		instance.interceptors.request.use(
			config => config,
			error => Promise.reject(error)
		);
		instance.interceptors.response.use(this.handleSuccess,
			this.handleError);
		//đưa instance đi khắp các fucntion trong class
		this.instance = instance;
	}

	//xử lý khi gọi API thành công
	handleSuccess(response){
		return response;
	}

	//xử lý thất bại
	handleError(error){
		return Promise.reject(error);
	}

	get(url, headers){
		if (_.isEmpty(headers)) {
			return this.instance.get(url);
		}
		return this.instance.get(url, headers);
	}

	post(url, body, headers){
		if (_.isEmpty(headers)) {
			return this.instance.post(url, body);
		}
		return this.instance.post(url, body, headers);
	}

	put(url, body, headers){
		if (_.isEmpty(headers)) {
			return this.instance.put(url, body);
		}
		return this.instance.put(url, body, headers);
	}

	delete(url, headers){
		if (_.isEmpty(headers)) {
			return this.instance.delete(url);
		}
		return this.instance.delete(url, headers);
	}

	changeHeaders = headers => {
		if (typeof headers === "undefined") {
			return;
		}
		const defaultHeaders = _.get(this.instance, "defaults.headers");
		const cleanHeaders = _.omitBy(  // xóa đi những header empty
			{
				...defaultHeaders,
				...headers
			},
			_.isEmpty
		);
		return this.instance.defaults.headers = cleanHeaders;
	};
}

export default new AxiosService();
