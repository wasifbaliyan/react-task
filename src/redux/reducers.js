import { actionTypes } from "./actionTypes";
const initialStateAlbumsAndUsers = {
  albums: [],
  loading: false,
  errors: "",
};

export const fetchAlbumsAndUsers = (
  state = initialStateAlbumsAndUsers,
  action
) => {
  switch (action.type) {
    case actionTypes.FETCH_ALBUMS_AND_USERS_PENDING:
      return { ...state, loading: true };
    case actionTypes.FETCH_ALBUMS_AND_USERS_SUCCESS:
      return { ...state, loading: false, albums: action.payload };
    case actionTypes.FETCH_ALBUMS_AND_USERS_FAILED:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};
