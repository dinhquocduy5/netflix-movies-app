import React from 'react';
import styles from '../styles/MovieList.module.scss';

const SkeletonMovieCard: React.FC = () => (
  <div className={styles.movieCard + ' ' + styles.skeletonCard}>
    <div className={styles.poster + ' ' + styles.skeletonPoster} />
    <div className={styles.skeletonTitle} />
    <div className={styles.skeletonRelease} />
  </div>
);

export default SkeletonMovieCard;
