# SAEPSaúde — estilização (React)

Projeto React (Vite) contendo **apenas as telas e componentes estilizados**
do caderno de prova. Não há regras de negócio reais (sem validação de
formulário, sem banco de dados, sem cálculo de likes persistente) — os
estados de interface (logado/deslogado, modal aberto, like marcado,
comentário aberto) existem só para você conseguir navegar entre as telas.

## Rodar

```bash
npm install
npm run dev
```

## Estrutura

```
src/
  main.jsx              # monta Router + AuthProvider + App
  App.jsx               # shell: Sidebar + TopBar + rotas + modal
  context/
    AuthContext.jsx      # estado de visualização (logado / modal aberto)
  data/
    mockData.js          # dados estáticos usados só para renderizar
  styles/
    variables.css        # tokens de cor/raio/sombra (paleta do caderno)
    global.css            # reset + grid do app-shell
  pages/
    Home/                 # tela inicial — feed, filtros, paginação
    CreateActivity/        # tela "/atividade" — formulário + suas atividades
  components/
    Sidebar/               # perfil, anéis de atividade, rodapé
    TopBar/                 # botão Login / Logout
    FilterTabs/              # Corrida / Caminhada / Trilha
    ActivityCard/             # card de atividade (feed e "suas atividades")
    CommentBox/                # input de comentário
    Pagination/                 # Anterior / 1 2 3 / Próximo
    LoginModal/                  # popup de login
    icons/                        # ícones SVG inline reutilizáveis
```

## Paleta (fixa pelo caderno de prova)

| Cor | Hex |
|---|---|
| Branco | `#FFFFFF` |
| Preto | `#000000` |
| Cinza escuro | `#333333` |
| Roxo (destaque) | `#483DAD` |
| Vermelho (like ativo) | `#FF0000` |

Fonte: **Inter**, carregada via Google Fonts no `index.html`.
