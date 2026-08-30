import styles from "./ActivityCard.module.css";
import { HeartIcon, CommentIcon } from "../icons/Icons";
import CommentBox from "../CommentBox/CommentBox";

export default function ActivityCard({
  activity,
  showActions = true,
  liked = false,
  onToggleLike,
  commentsOpen = false,
  onToggleComments,
}) {
  if (!activity) return null;

  // Compatibilidade com os campos do Sequelize (snake_case) e mock (camelCase)
  const type = activity.tipo_atividade || activity.type || "Atividade";
  const distance = activity.distancia_percorrida ?? activity.distance;
  const duration = activity.duracao_atividade ?? activity.duration;
  const calories = activity.quantidade_calorias ?? activity.calories;

  // Captura do usuário (suporta o include do Sequelize: activity.usuario ou activity.Usuario)
  const user = activity.usuario || activity.Usuario || {};
  const userName = user.nome || user.name || activity.userName || "Usuário";

  // Gera as iniciais do nome automaticamente caso não venham prontas
  const userInitials =
    activity.userInitials ||
    userName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

  // Formatação da data (createdAt do Sequelize ou prop date)
  const rawDate = activity.createdAt || activity.date;
  const formattedDate = rawDate
    ? new Date(rawDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "";

  // Unidades de medida com fallback
  const formattedDistance =
    typeof distance === "number" ? `${distance} m` : distance;
  const formattedDuration =
    typeof duration === "number" ? `${duration} min` : duration;
  const formattedCalories =
    typeof calories === "number" ? `${calories} kcal` : calories;

  // Interações
  const likesCount = activity.likes_count ?? activity.likes ?? 0;
  const commentsCount = activity.comments_count ?? activity.comments ?? 0;

  const isAlt = userInitials === "U2";

  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <span />
        <span className={styles.type}>
          <span className={styles.typeDot} />
          {type}
        </span>
        <span className={styles.date}>{formattedDate}</span>
      </div>

      <div className={styles.body}>
        <div className={`${styles.avatar} ${isAlt ? styles.alt : ""}`}>
          {userInitials}
        </div>
        <div className={styles.userBlock}>
          <div className={styles.userName}>{userName}</div>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metric}>
            <div className={styles.metricValue}>{formattedDistance}</div>
            <div className={styles.metricLabel}>Distância</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricValue}>{formattedDuration}</div>
            <div className={styles.metricLabel}>Duração</div>
          </div>
          <div className={styles.metric}>
            <div className={styles.metricValue}>{formattedCalories}</div>
            <div className={styles.metricLabel}>Calorias</div>
          </div>
        </div>

        {showActions && (
          <div className={styles.actions}>
            <button
              className={`${styles.actionBtn} ${liked ? styles.liked : ""}`}
              onClick={onToggleLike}
              aria-label="Curtir"
            >
              <HeartIcon />
              <span>{likesCount}</span>
            </button>
            <button
              className={styles.actionBtn}
              onClick={onToggleComments}
              aria-label="Comentar"
            >
              <CommentIcon />
              <span>{commentsCount}</span>
            </button>
          </div>
        )}
      </div>

      {commentsOpen && <CommentBox />}
    </article>
  );
}
