import React from "react";

import "./album-photo.styles.css";

export default function AlbumPhoto({ photo }) {
  return (
    <figure className="album-photo">
      <img className="album__img" src={photo.thumbnailUrl} alt={photo.title} />
      <figcaption className="album__figcaption">{photo.title}</figcaption>
    </figure>
  );
}
