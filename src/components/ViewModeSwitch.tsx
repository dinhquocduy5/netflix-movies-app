import React from 'react';
import styles from '../styles/ViewModeSwitch.module.scss';

interface ViewModeSwitchProps {
  mode: 'list' | 'grid';
  onChange: (mode: 'list' | 'grid') => void;
}

const ViewModeSwitch: React.FC<ViewModeSwitchProps> = ({ mode, onChange }) => {
  return (
    <div className={styles.switch}>
      <button
        className={mode === 'list' ? styles.active : ''}
        onClick={() => onChange('list')}
        type="button"
      >
        List
      </button>
      <button
        className={mode === 'grid' ? styles.active : ''}
        onClick={() => onChange('grid')}
        type="button"
      >
        Grid
      </button>
    </div>
  );
};

export default ViewModeSwitch;
