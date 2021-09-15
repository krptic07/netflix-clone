import { useEffect, useState } from "react";
import axios from "../configuration/axios";
import styles from "./Banner.module.css";

function Banner(props) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchBanner = async () => {
      const response = await axios.get(props.request);
      const results = response.data.results;
      const randomNum = Math.floor(Math.random() * results.length - 1);
      setMovie(results[randomNum]);
      return response;
    };

    fetchBanner();
  }, [props.request]);

  const truncateString = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <header
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
        backgroundPosition: "center center",
      }}
    >
      <div className={styles.banner__contents}>
        <h1 className={styles.banner__title}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <button className={styles.banner__button}>Play</button>
        <button className={styles.banner__button}>My List</button>
        <h1 className={styles.banner__description}>
          {truncateString(movie?.overview, 150)}
        </h1>
      </div>
      <div className={styles["banner--fadeBottom"]}></div>
    </header>
  );
}

export default Banner;
