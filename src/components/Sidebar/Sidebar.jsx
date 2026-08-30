import styles from './Sidebar.module.css';
import { LogoBoltIcon, ActivityBarsIcon, InstagramIcon, TwitterIcon, TikTokIcon } from '../icons/Icons';

const RING_CIRCUMFERENCE = 163.4; // 2 * PI * r(26)

function ActivityRing({ value, label, offset, fillColor }) {
  return (
    <div className={styles.ringStat}>
      <svg viewBox="0 0 64 64">
        <circle className={styles.ringTrack} cx="32" cy="32" r="26" />
        <circle
          className={styles.ringFill}
          style={{ stroke: fillColor }}
          cx="32"
          cy="32"
          r="26"
          strokeDasharray={RING_CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 32 32)"
        />
        <text x="32" y="37" textAnchor="middle" className={styles.ringValue}>
          {value}
        </text>
      </svg>
      <span className={styles.ringLabel}>{label}</span>
    </div>
  );
}

export default function Sidebar({ company, stats, isLoggedIn, isActivePage, onNavActivityClick }) {
  return (
    <aside className={styles.profile}>
      <div className={styles.brand}>
        <div className={styles.brandMark}>
          <LogoBoltIcon />
        </div>
        <div>
          <div className={styles.brandName}>{company.name}</div>
          <div className={styles.brandTag}>{company.tag}</div>
        </div>
      </div>

      <div className={styles.statRings}>
        <ActivityRing value={stats.totalActivities} label="Atividades" offset={55} fillColor="#7a6fe0" />
        <ActivityRing value={stats.totalCalories} label="Calorias" offset={40} fillColor="#9d93e8" />
      </div>

      <button
        className={`${styles.navActivity} ${isActivePage ? styles.isActive : ''}`}
        disabled={!isLoggedIn}
        onClick={onNavActivityClick}
      >
        <ActivityBarsIcon />
        Atividade
      </button>

      <div className={styles.spacer} />

      <div className={styles.footer}>
        <div className={styles.footerBrand}>{company.name}</div>
        <div className={styles.socialRow}>
          <a href="#" aria-label="Instagram">
            <InstagramIcon />
          </a>
          <a href="#" aria-label="Twitter">
            <TwitterIcon />
          </a>
          <a href="#" aria-label="TikTok">
            <TikTokIcon />
          </a>
        </div>
        <div className={styles.copyright}>Copyright — 2025/2026</div>
      </div>
    </aside>
  );
}
