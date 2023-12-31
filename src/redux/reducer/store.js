import { createStore,applyMiddleware  } from "redux";
import rootReducers from "../reducer/index";
import {thunk} from "redux-thunk";

const store = createStore(rootReducers);
// const store = createStore(rootReducers, applyMiddleware(thunk));
export default store;

