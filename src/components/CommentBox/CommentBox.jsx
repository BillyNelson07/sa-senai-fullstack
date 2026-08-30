import styles from './CommentBox.module.css';
import { SendIcon } from '../icons/Icons';

export default function CommentBox() {
  return (
    <div className={styles.commentBox}>
      <input type="text" placeholder="Escrever comentário…" />
      <button className={styles.send} aria-label="Enviar">
        <SendIcon />
      </button>
    </div>
  );
}
