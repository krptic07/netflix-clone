import { useState, useEffect } from "react";
import axios from "../configuration/axios";
import styles from "./Row.module.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const baseUrl = "https://image.tmdb.org/t/p/original/";

function Row(props) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    const fetchMoviesData = async () => {
      const response = await axios.get(props.request);
      setMovies(response.data.results);
      return response;
    };
    fetchMoviesData();
  }, [props.request]);

  // console.table(movies);
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleTrailerClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      try {
        const movieTrailerUrl = await movieTrailer(
          movie?.name || movie?.title || ""
        );
        const searchParams = new URLSearchParams(
          new URL(movieTrailerUrl).search
        );
        const videoId = searchParams.get("v");
        setTrailerUrl(videoId);
      } catch (error) {
        console.log(error, "Something went wrong !!");
      }
    }
  };

  return (
    <div className={styles.row}>
      <h2>{props.title}</h2>
      <div className={styles.row_posters}>
        {movies.map((movie) => {
          return (
            <img
              key={movie.id}
              className={`${styles.row_poster} ${
                props.originals ? styles.originals : ""
              }`}
              onClick={handleTrailerClick.bind(null, movie)}
              src={
                props.originals
                  ? `${baseUrl}${movie.poster_path}`
                  : `${baseUrl}${movie.backdrop_path}`
              }
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
