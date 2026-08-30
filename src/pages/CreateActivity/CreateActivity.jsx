import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./CreateActivity.module.css";
import { api } from "../../services/api"; // Importando a instância do axios
import ActivityCard from "../../components/ActivityCard/ActivityCard";

export default function CreateActivity() {
  // Estados para o formulário
  const [tipoAtividade, setTipoAtividade] = useState("");
  const [distancia, setDistancia] = useState("");
  const [duracao, setDuracao] = useState("");
  const [calorias, setCalorias] = useState("");

  // Estado para a listagem
  const [atividades, setAtividades] = useState([]);

  // Carregar as atividades do banco ao montar o componente
  useEffect(() => {
    const buscarAtividades = async () => {
      try {
        const response = await api.get("/atividades/get");
        setAtividades(response.data);
      } catch (error) {
        console.error("Erro ao carregar as atividades:", error);
      }
    };

    buscarAtividades();
  }, []);

  // Enviar os dados do formulário para o banco
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const novaAtividade = {
        tipo_atividade: tipoAtividade,
        distancia_percorrida: Number(distancia),
        duracao_atividade: Number(duracao),
        quantidade_calorias: Number(calorias),
        // ATENÇÃO: O usuario_id deve vir do seu contexto de autenticação ou token.
        // Aqui está chumbado como 1 apenas para exemplo.
        usuario_id: 1,
      };

      const response = await api.post("/atividades/post", novaAtividade);

      // Adiciona a nova atividade no início da lista para refletir na tela imediatamente
      setAtividades([response.data, ...atividades]);

      // Limpa os campos do formulário
      setTipoAtividade("");
      setDistancia("");
      setDuracao("");
      setCalorias("");
      alert("Atividade criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar a atividade:", error);
      alert("Ocorreu um erro ao criar a atividade.");
    }
  };

  return (
    <div className={styles.view}>
      <div className={styles.card}>
        <h2 className={styles.title}>Crie sua atividade</h2>

        {/* Transformado em formulário para permitir envio com a tecla Enter */}
        <form className={styles.grid} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="type">Tipo da atividade</label>
            <select
              id="type"
              value={tipoAtividade}
              onChange={(e) => setTipoAtividade(e.target.value)}
              required
            >
              <option value="" disabled>
                Ex: Caminhada
              </option>
              <option value="Corrida">Corrida</option>
              <option value="Caminhada">Caminhada</option>
              <option value="Trilha">Trilha</option>
            </select>
          </div>
          <div className={styles.field}>
            <label htmlFor="distance">Distância percorrida (metros)</label>
            <input
              id="distance"
              type="number"
              placeholder="Ex: 1000"
              value={distancia}
              onChange={(e) => setDistancia(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="duration">Duração da atividade (minutos)</label>
            <input
              id="duration"
              type="number"
              placeholder="Ex: 120"
              value={duracao}
              onChange={(e) => setDuracao(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="calories">Quantidade de calorias</label>
            <input
              id="calories"
              type="number"
              placeholder="Ex: 300"
              value={calorias}
              onChange={(e) => setCalorias(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.submit}>
            Criar Atividade
          </button>
        </form>
      </div>

      <h3 className={styles.sectionLabel}>Suas Atividades</h3>
      <div className={styles.feed}>
        {atividades.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
