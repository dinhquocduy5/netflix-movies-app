import { isNil } from "lodash";
import type { ImgHTMLAttributes } from "react";
import React, { useEffect, useState } from "react";
import SkeletonMovieCard from "./SkeletonMovieCard";
import { useNavigate } from "react-router-dom";
import { fetchMovies, searchMovies } from "../services/tmdbApi";
import styles from "../styles/MovieList.module.scss";
import type { Movie } from "../services/tmdbTypes";

function FadeInImg({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      {...props}
      className={className + " " + (loaded ? styles.posterFade : "")}
      loading="lazy"
      onLoad={() => setLoaded(true)}
    />
  );
}

interface MovieListProps {
  type?: string;
  search?: string;
  viewMode?: "list" | "grid";
}

const MovieList: React.FC<MovieListProps> = ({
  type = "now_playing",
  search = "",
  viewMode = "grid",
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showSkeletons, setShowSkeletons] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    setShowSkeletons(true);
    const fetchData = async () => {
      try {
        let data;
        if (search) {
          data = await searchMovies(search, page);
        } else {
          data = await fetchMovies(type, page);
        }
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 1);
      } catch {
        setError("Failed to fetch movies.");
      } finally {
        setShowSkeletons(false);
      }
    };
    fetchData();
  }, [type, search, page]);

  const skeletonCount = viewMode === "list" ? 4 : 8;
  if (showSkeletons) {
    return (
      <div
        className={
          styles.movieList +
          " container " +
          (viewMode === "list" ? styles.listMode : styles.gridMode)
        }
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonMovieCard key={i} />
        ))}
      </div>
    );
  }
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      <div
        className={
          styles.movieList +
          " container " +
          (viewMode === "list" ? styles.listMode : styles.gridMode)
        }
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={styles.movieCard}
            onClick={() => navigate(`/movie/${movie.id}`)}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${movie.title}`}
          >
            {!isNil(movie.poster_path) && movie.poster_path !== "" ? (
              <FadeInImg
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title || "No title"}
                className={styles.poster}
              />
            ) : (
              <div className={styles.poster} />
            )}
            {viewMode === "list" ? (
              <div className={styles.info}>
                <div className={styles.title}>
                  {!isNil(movie.title) ? movie.title : "No title"}
                </div>
                <div className={styles.release}>
                  {!isNil(movie.release_date) ? movie.release_date : ""}
                </div>
              </div>
            ) : (
              <>
                <div className={styles.title}>
                  {!isNil(movie.title) ? movie.title : "No title"}
                </div>
                <div className={styles.release}>
                  {!isNil(movie.release_date) ? movie.release_date : ""}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          className="button"
          onClick={() => setPage((p: number) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className={styles.pageInfo}>
          Page {page} / {totalPages}
        </span>
        <button
          className="button"
          onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default MovieList;
