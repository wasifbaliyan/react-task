import { useEffect } from "react";
import { useState } from "react";
import AlbumPhoto from "../album-photo/album-photo.component";
import Pagination from "../pagination/pagination.component";
import { paginate } from "../utils/paginate";

import "./album-page.styles.css";
import Loader from "../loader/loader.component";

export default function AlbumPage({ match, location }) {
  // const [albumDetails, setAlbumDetails] = useState([]);
  // const [photos, setPhotos] = useState([]);
  // const [user, setUser] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // useEffect(() => {
  //   fetch(`https://jsonplaceholder.typicode.com/albums/${match.params.id}`)
  //     .then((res) => res.json())
  //     .then((data) => setAlbumDetails(data));
  // }, [match.params.id]);

  // useEffect(() => {
  //   fetch(
  //     `https://jsonplaceholder.typicode.com/albums/${match.params.id}/photos`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setPhotos(data));
  // }, [match.params.id]);

  // useEffect(() => {
  //   fetch(
  //     `https://jsonplaceholder.typicode.com/users/${location.state.user.id}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setUser(data));
  // }, [location.state.user.id]);

  useEffect(() => {
    Promise.all([
      fetch(`https://jsonplaceholder.typicode.com/albums/${match.params.id}`),
      fetch(
        `https://jsonplaceholder.typicode.com/albums/${match.params.id}/photos`
      ),
      fetch(
        `https://jsonplaceholder.typicode.com/users/${location.state.user.id}`
      ),
    ])
      .then(function (responses) {
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [match.params.id, location.state.user.id]);

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
