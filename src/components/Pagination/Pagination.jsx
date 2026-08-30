import styles from './Pagination.module.css';

export default function Pagination({ page, totalPages, onChange }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.pageBtn}
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        Anterior
      </button>

      {pages.map((n) => (
        <button
          key={n}
          className={`${styles.pageBtn} ${page === n ? styles.isActive : ''}`}
          onClick={() => onChange(n)}
        >
          {n}
        </button>
      ))}

      <button
        className={styles.pageBtn}
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        Próximo
      </button>
    </div>
  );
}
