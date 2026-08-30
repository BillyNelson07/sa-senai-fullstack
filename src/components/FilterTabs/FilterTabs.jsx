import styles from './FilterTabs.module.css';

export default function FilterTabs({ options, active, onChange }) {
  return (
    <nav className={styles.filters}>
      {options.map((option) => (
        <button
          key={option}
          className={`${styles.tab} ${active === option ? styles.isActive : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </nav>
  );
}
