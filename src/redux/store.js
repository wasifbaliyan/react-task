import { applyMiddleware, combineReducers, createStore } from "redux";
import { fetchAlbumsAndUsers, fetchAlbumDetails } from "./reducers";
import thunkMiddleware from "redux-thunk";

const rootReducers = combineReducers({
  fetchAlbumsAndUsers: fetchAlbumsAndUsers,
  fetchAlbumDetails: fetchAlbumDetails,
});

export const store = createStore(
  rootReducers,
  applyMiddleware(thunkMiddleware)
);
