import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';

//kiểm tra môi trường web là dev và tích hợp redux_dev_tool
const composeEnhencers = process.env.NODE_ENV !== 'production' &&
    typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldNotReload:false
    }) : compose;

//tạo saga-middleware
const sagaMiddleware =createSagaMiddleware();

const configureStore = () =>{
    //chứa các middleware
    const middlewares = [sagaMiddleware];
    const enhancers = [
        applyMiddleware(...middlewares)
    ];
    const store = createStore(rootReducer, composeEnhencers(...enhancers));
    sagaMiddleware.run(rootSaga);
    return store;
};

export default configureStore;
