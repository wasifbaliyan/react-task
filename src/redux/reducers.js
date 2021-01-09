import { actionTypes } from "./actionTypes";
const initialStateAlbumsAndUsers = {
  albums: [],
  loading: true,
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

const initialStateAlbumDetails = {
  data: [],
  loading: true,
  errors: "",
};

export const fetchAlbumDetails = (state = initialStateAlbumDetails, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALBUM_DETAILS_PENDING:
      return { ...state, loading: true };
    case actionTypes.FETCH_ALBUM_DETAILS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case actionTypes.FETCH_ALBUM_DETAILS_FAILED:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
};
