import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import Album from "../album/album.component";
import Pagination from "../pagination/pagination.component";
import { paginate } from "../utils/paginate";
// import { fetchAlbumsAndUsers } from "../redux/actions";

import "./album-list.styles.css";
import Loader from "../loader/loader.component";

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
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
        setAlbums(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   fetchAlbumsAndUsers();
  // }, []);

  const pageSize = 5;
  const paginatedAlbums = paginate(albums[0], currentPage, pageSize);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="album-list">
          <h1 className="album-list__heading">LIST OF ALBUMS</h1>
          <div className="album-list__container">
            {paginatedAlbums.map((album) => {
              const user = albums[1].find((user) => user.id === album.userId);
              return <Album key={album.id} user={user} album={album} />;
            })}
          </div>
          <div>
            <Pagination
              itemsCount={albums[0].length}
              onPageChange={onPageChange}
              currentPage={currentPage}
              pageSize={pageSize}
              nextPage={nextPage}
              prevPage={prevPage}
            />
          </div>
        </div>
      )}
    </>
  );
}

// const mapStateToProps = (state) => ({
//   albums: state.fetchAlbumsAndUsers.albums,
//   loading: state.fetchAlbumsAndUsers.loading,
//   errors: state.fetchAlbumsAndUsers.errors,
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchAlbumsAndUsers: () => dispatch(fetchAlbumsAndUsers()),
// });

export default AlbumList;
