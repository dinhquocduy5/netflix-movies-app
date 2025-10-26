import React, { useEffect, useState } from 'react';
import { isNil, get, isArray } from 'lodash';
import { fetchMovieDetail } from '../services/tmdbApi';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/MovieDetail.module.scss';
import type { MovieDetail } from '../services/tmdbDetailTypes';

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError('');
    fetchMovieDetail(id)
      .then(setMovie)
      .catch(() => setError('Failed to fetch movie detail.'))
      .finally(() => setLoading(false));
  }, [id]);


  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (isNil(movie)) return null;

  return (
    <div className={styles.detail}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        &#8592; Back
      </button>
      <div className={styles.content}>
        {!isNil(get(movie, 'poster_path')) ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${get(movie, 'poster_path', '')}`}
            alt={get(movie, 'title', 'No title')}
            className={styles.poster}
            style={{ boxShadow: '0 4px 24px #0008' }}
          />
        ) : (
          <div className={styles.poster} />
        )}
        <div className={styles.info}>
          <h2>{get(movie, 'title', 'No title')}</h2>
          <div className={styles.meta}>
            <span>{get(movie, 'release_date', '')}</span>
            <span>Rating: {get(movie, 'vote_average', '')}</span>
          </div>
          <div className={styles.genres}>
            {isArray(get(movie, 'genres')) && get(movie, 'genres').map((g: any) => (
              <span key={get(g, 'id', '')}>{get(g, 'name', '')}</span>
            ))}
          </div>
          <p>{get(movie, 'overview', '')}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
