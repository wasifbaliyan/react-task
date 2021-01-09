import { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import AlbumPhoto from "../album-photo/album-photo.component";
import Pagination from "../pagination/pagination.component";
import { paginate } from "../utils/paginate";
import { fetchAlbumDetails } from "../redux/actions";

import "./album-page.styles.css";
import Loader from "../loader/loader.component";

function AlbumPage({ match, location, loading, fetchAlbumDetails, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;

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
    fetchAlbumDetails(match.params.id, location.state.user.id);
  }, [match.params.id, location.state.user.id, fetchAlbumDetails]);

  const paginatedAlbumPhotos = paginate(data[1], currentPage, pageSize);

  return (
    <div className="album-page">
      {loading ? (
        <Loader />
      ) : (
        <div className="album-page__container">
          <h1 className="album-page__heading">{data[0].title}</h1>
          <h3 className="album-page__username">{data[2].name}</h3>
          <section>
            <div className="photos__container">
              {paginatedAlbumPhotos.map((photo) => (
                <AlbumPhoto key={photo.id} photo={photo} />
              ))}
            </div>
            <div>
              <Pagination
                itemsCount={data[1].length}
                onPageChange={onPageChange}
                currentPage={currentPage}
                pageSize={pageSize}
                nextPage={nextPage}
                prevPage={prevPage}
              />
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  loading: state.fetchAlbumDetails.loading,
  data: state.fetchAlbumDetails.data,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAlbumDetails: (id, userId) => dispatch(fetchAlbumDetails(id, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumPage);
