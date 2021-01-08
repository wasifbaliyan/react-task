import { actionTypes } from "./actionTypes";
import axios from "axios";

// export const fetchAlbumsAndUsers = () => (dispatch) => {
//   dispatch({ type: actionTypes.FETCH_ALBUMS_AND_USERS_PENDING });
//   Promise.all([
//     fetch("https://jsonplaceholder.typicode.com/albums"),
//     fetch("https://jsonplaceholder.typicode.com/users"),
//   ])
//     .then(function (responses) {
//       return Promise.all(
//         responses.map(function (response) {
//           return response.json();
//         })
//       );
//     })
//     .then(function (data) {
//       dispatch({
//         type: actionTypes.FETCH_ALBUMS_AND_USERS_SUCCESS,
//         payload: data,
//       });
//     })
//     .catch(function (error) {
//       dispatch({
//         type: actionTypes.FETCH_ALBUMS_AND_USERS_FAILED,
//         payload: error,
//       });
//     });
// };

export const fetchAlbumsAndUsers = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ALBUMS_AND_USERS_PENDING });
    function getAlbums() {
      return axios.get("https://jsonplaceholder.typicode.com/albums");
    }

    function getUsers() {
      return axios.get("https://jsonplaceholder.typicode.com/users");
    }
    axios
      .get([getAlbums(), getUsers()])
      .then((data) => {
        dispatch({
          type: actionTypes.FETCH_ALBUMS_AND_USERS_SUCCESS,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.FETCH_ALBUMS_AND_USERS_FAILED,
          payload: err,
        });
      });
  };
};
