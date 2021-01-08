import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { fetchAlbumsAndUsers } from "./reducers";
import logger from "redux-logger";
const middlewares = [thunkMiddleware, logger];

const rootReducers = combineReducers({
  fetchAlbumsAndUsers: fetchAlbumsAndUsers,
});

export const store = createStore(rootReducers, applyMiddleware(...middlewares));
