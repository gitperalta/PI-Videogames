import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { videogameDetail } from "../../redux/actions";

export default function VideogameDetail() {
  const dispatch = useDispatch();
  const params = useParams();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(videogameDetail(params.id));
  }, [dispatch]);

  return params.id == detail.id ? (
    <>
      <h1>Videogame Detail</h1>
      <h3>Name:</h3>
      <span>{detail.name}</span>
      <h3>Genres: </h3>
      <ul>
        {detail.genres.map((genre) => (
          <li key={genre.name ?? genre}>{genre.name ?? genre}</li>
        ))}
      </ul>
      <h3>Rating:</h3>
      <span>{detail.rating}</span>
      <h3>Released:</h3>
      <span>{detail.released}</span>
      <h3>Platforms: </h3>
      <ul>
        {detail.platforms.map((platform) => (
          <li key={platform}>{platform}</li>
        ))}
      </ul>
      <h3>Background Image:</h3>
      <img
        src={detail.background_image}
        alt="error"
        style={{ width: "400px", height: "300px" }}
      />
      <h3>Description: </h3>
      <p>
        {detail.description
          .split("<p>")
          .join()
          .split("</p>")
          .join()
          .slice(1, -1)
          .split("<br />")
          .join(" ")}
      </p>
      <h3></h3>

      <Link to="/home">
        <input type="button" value="Home" />
      </Link>
    </>
  ) : (
    <span>loading...</span>
  );
}
