import React from "react";
import { Link } from "react-router-dom";
import "./album.styles.css";

export default function Album({ album, user }) {
  return (
    <div className="album">
      <h2 className="album-heading">{album.title}</h2>
      <div className="album__name">
        <h3 className="user__name">{user.name}</h3>
        <Link
          className="album__link"
          to={{
            pathname: `/album/${album.id}`,
            state: {
              user: user,
            },
          }}
        >
          view more
        </Link>
      </div>
    </div>
  );
}
