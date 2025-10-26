import React from 'react';
import styles from '../styles/TabBar.module.scss';

interface TabBarProps {
  tab: 'now_playing' | 'top_rated';
  onChange: (tab: 'now_playing' | 'top_rated') => void;
}

const TabBar: React.FC<TabBarProps> = ({ tab, onChange }) => {
  return (
    <div className={styles.tabBar}>
      <button
        onClick={() => onChange('now_playing')}
        className={styles.tabBtn + (tab === 'now_playing' ? ' ' + styles.active : '')}
      >
        Now Playing
      </button>
      <button
        onClick={() => onChange('top_rated')}
        className={styles.tabBtn + (tab === 'top_rated' ? ' ' + styles.active : '')}
      >
        Top Rated
      </button>
    </div>
  );
};

export default TabBar;
