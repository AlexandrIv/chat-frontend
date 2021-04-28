import {applyMiddleware, createStore, compose} from "redux";
import thunk from 'redux-thunk';

import rootReducer from './reducers';

const composeEnchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [thunk];

const store = createStore(rootReducer, composeEnchancers(applyMiddleware(...middleware)));

export default store;
