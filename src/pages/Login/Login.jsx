import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';
import { LogoBoltIcon } from '../../components/icons/Icons';
import { login as loginRequest } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext';

const EMPTY_ERRORS = { email: '', senha: '' };

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [fieldErrors, setFieldErrors] = useState(EMPTY_ERRORS);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    // Regra 4: campo ausente → borda vermelha + "email ou senha obrigatório".
    const nextErrors = { ...EMPTY_ERRORS };
    if (!email.trim()) nextErrors.email = 'Email ou senha obrigatório';
    if (!senha.trim()) nextErrors.senha = 'Email ou senha obrigatório';

    if (nextErrors.email || nextErrors.senha) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors(EMPTY_ERRORS);
    setLoading(true);

    try {
      await loginRequest(email.trim(), senha);
      auth.login(); // marca isLoggedIn = true no contexto
      navigate('/');
    } catch (err) {
      // Regra 5: credenciais erradas → destaca os dois campos + mensagem.
      setFieldErrors({
        email: 'Email ou senha incorreta',
        senha: 'Email ou senha incorreta',
      });
      setFormError(err.message || 'Não foi possível entrar. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.wrapper}>
      <aside className={styles.brandPane}>
        <div className={styles.brandMark}>
          <LogoBoltIcon />
        </div>
        <h1 className={styles.brandTitle}>Entre e acompanhe sua evolução</h1>
        <p className={styles.brandSubtitle}>
          Registre corridas, caminhadas e trilhas, e acompanhe curtidas e comentários da
          comunidade SAEPSaúde.
        </p>
        <div className={styles.ringDecor} />
      </aside>

      <main className={styles.formPane}>
        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          <h2 className={styles.title}>Login</h2>
          <p className={styles.subtitle}>Informe suas credenciais para continuar.</p>

          {formError && <div className={styles.formError}>{formError}</div>}

          <div className={`${styles.field} ${fieldErrors.email ? styles.hasError : ''}`}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            {fieldErrors.email && <span className={styles.fieldError}>{fieldErrors.email}</span>}
          </div>

          <div className={`${styles.field} ${fieldErrors.senha ? styles.hasError : ''}`}>
            <label htmlFor="senha">Senha</label>
            <input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              autoComplete="current-password"
            />
            {fieldErrors.senha && <span className={styles.fieldError}>{fieldErrors.senha}</span>}
          </div>

          <button className={styles.submit} type="submit" disabled={loading} aria-busy={loading}>
            {loading ? 'Entrando…' : 'Login'}
          </button>

          <Link className={styles.backLink} to="/">
            Voltar para a página inicial
          </Link>
        </form>
      </main>
    </div>
  );
}
