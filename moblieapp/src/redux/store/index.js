import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import createApiAuthMiddle from "./middlewares";

//tạo saga-middleware
const sagaMiddleware =createSagaMiddleware();

const configureStore = () =>{
    //chứa các middleware
    const middlewares = [sagaMiddleware, createApiAuthMiddle];
    const store = createStore(rootReducer, applyMiddleware(...middlewares));
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;