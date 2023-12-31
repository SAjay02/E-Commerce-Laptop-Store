import { combineReducers } from "redux";
import handleCart from "../reducer/handleCart";
import userReducer from "../reducer/userReducer"
const rootReducers = combineReducers({
  handleCart,
});

// const rootReducers = combineReducers({
//   handleCart,
//   user: userReducer,
// });

export default rootReducers;