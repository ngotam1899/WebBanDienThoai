import { AsyncStorage } from 'react-native';
import _ from "lodash";
import axiosService from '../../utils/AxiosService';


export default function createApiAuthMiddle({ dispatch, getState }) {
  return  (next) => async (action) => {
    const authToken = await AsyncStorage.getItem("AUTH_USER");
    axiosService.changeHeaders({
      Authorization: authToken,
      "token": '042cf697-8659-11eb-8be2-c21e19fc6803'
    });
    return next(action);
  };
}