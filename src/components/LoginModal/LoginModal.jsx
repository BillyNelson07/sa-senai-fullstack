import styles from './LoginModal.module.css';
import { CloseIcon } from '../icons/Icons';

export default function LoginModal({ open, onClose, onCancel, onSubmit }) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <div className={styles.head}>
          <span className={styles.title}>Login</span>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar">
            <CloseIcon />
          </button>
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" />
        </div>

        <div className={styles.field}>
          <label htmlFor="senha">Senha</label>
          <input id="senha" type="password" />
        </div>

        {/* Exemplo de estado de erro (regras 4 e 5):
            adicione a classe "hasError" ao .field correspondente e
            renderize <span className={styles.fieldError}>mensagem</span> */}

        <div className={styles.actions}>
          <button className={`${styles.btn} ${styles.cancel}`} onClick={onCancel}>
            Cancelar
          </button>
          <button className={`${styles.btn} ${styles.primary}`} onClick={onSubmit}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
