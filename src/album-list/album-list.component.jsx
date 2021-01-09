import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Album from "../album/album.component";
import Pagination from "../pagination/pagination.component";
import { paginate } from "../utils/paginate";
import { fetchAlbumsAndUsers } from "../redux/actions";
import Loader from "../loader/loader.component";

import "./album-list.styles.css";

function AlbumList(props) {
  const { albums, loading, fetchAlbumsAndUsers } = props;

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
    fetchAlbumsAndUsers();
  }, [fetchAlbumsAndUsers]);

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

const mapStateToProps = (state) => ({
  albums: state.fetchAlbumsAndUsers.albums,
  loading: state.fetchAlbumsAndUsers.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbumsAndUsers: () => dispatch(fetchAlbumsAndUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumList);
