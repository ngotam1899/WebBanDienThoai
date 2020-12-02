import _ from "lodash";
import axiosService from '../../utils/AxiosService';

export default function createApiAuthMiddle({ dispatch, getState }) {
  return (next) => (action) => {
    const authToken = localStorage.getItem("AUTH_USER");
    axiosService.changeHeaders({
      Authorization: authToken
    });
    return next(action);
  };
}
