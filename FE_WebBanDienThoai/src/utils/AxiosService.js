import axios from 'axios';

class AxiosService {
  constructor(){
		//tạo instance (thực thể) thuộc axios
		const instance = axios.create();
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

	get(url){
		return this.instance.get(url);
	}

	post(url, body){
		return this.instance.post(url, body);
	}

	put(url, body){
		return this.instance.put(url, body);
	}

	delete(url){
		return this.instance.delete(url);
	}
}

export default new AxiosService();