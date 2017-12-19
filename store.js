import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import memoReducer from './reducers/memo';

const reducer = combineReducers({
    memo: memoReducer,
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

export default store;