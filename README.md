# BLUE — site institucional

Site estático (HTML/CSS/JS puro, sem build) apresentando os produtos da Blue:
NEXT GAME e Bounce Race.

## Rodar localmente

Só abrir o `index.html` no navegador. Ou, se quiser servir de verdade:

```bash
python3 -m http.server 8080
# depois acesse http://localhost:8080
```

## Subir no GitHub

1. Crie um repositório novo em https://github.com/new (ex: `blue-site`).
   **Não** marque "Add a README" — o repo precisa nascer vazio.
2. Na pasta deste projeto, rode:

```bash
git init
git add .
git commit -m "Site institucional da Blue"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/blue-site.git
git push -u origin main
```

Troque `SEU_USUARIO` pelo seu usuário do GitHub. Se pedir login, use um
Personal Access Token no lugar da senha (GitHub não aceita mais senha comum
pra git push) — gere em Settings → Developer settings → Personal access
tokens.

## Subir no Render

**Opção A — pelo dashboard (mais simples):**

1. Entre em https://dashboard.render.com → **New** → **Static Site**.
2. Conecte sua conta do GitHub e escolha o repositório `blue-site`.
3. Configure:
   - **Build Command:** (deixe em branco)
   - **Publish directory:** `.`
4. Clique em **Create Static Site**. Em ~1 minuto o Render te dá uma URL
   tipo `blue-site.onrender.com`.

**Opção B — automático via `render.yaml`:**

Este projeto já inclui um `render.yaml` na raiz. No dashboard, use
**New → Blueprint**, aponte pro repositório, e o Render lê esse arquivo
sozinho e configura tudo.

Depois de publicado, qualquer novo `git push` pra `main` já redeploya
automaticamente.

## Domínio próprio (opcional)

Se quiser usar um domínio tipo `blue.games` em vez do `.onrender.com`:
Render → seu site → **Settings** → **Custom Domains** → adiciona o domínio
e segue as instruções de DNS (CNAME) que ele mostra.
