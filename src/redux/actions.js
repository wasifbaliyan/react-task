import { actionTypes } from "./actionTypes";

export const fetchAlbumsAndUsers = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_ALBUMS_AND_USERS_PENDING });
  Promise.all([
    fetch("https://jsonplaceholder.typicode.com/albums"),
    fetch("https://jsonplaceholder.typicode.com/users"),
  ])
    .then(function (responses) {
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then(function (data) {
      dispatch({
        type: actionTypes.FETCH_ALBUMS_AND_USERS_SUCCESS,
        payload: data,
      });
    })
    .catch(function (error) {
      dispatch({
        type: actionTypes.FETCH_ALBUMS_AND_USERS_FAILED,
        payload: error,
      });
    });
};

export const fetchAlbumDetails = (id, userId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_ALBUM_DETAILS_PENDING });
  Promise.all([
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`),
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}/photos`),
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
  ])
    .then(function (responses) {
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then(function (data) {
      dispatch({
        type: actionTypes.FETCH_ALBUM_DETAILS_SUCCESS,
        payload: data,
      });
    })
    .catch(function (error) {
      dispatch({
        type: actionTypes.FETCH_ALBUM_DETAILS_FAILED,
        payload: error,
      });
    });
};
