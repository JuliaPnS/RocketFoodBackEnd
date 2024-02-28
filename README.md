
# RocketFood 

O RocketFood é um aplicativo de entrega de comida. Permite que o usuário encontre a melhor opção de prato para ele e faça um pedido. Enquanto, do lado do administrador, permite que edite e crie novos pratos.

## Stack utilizada

**Back-end:** React, Node, JavaScript, Knex, Bcryptjs, SQLite e SQLite3, Express

## Funcionalidades

- Visualização de detalhes do prato
- Cadastrar um novo prato
- Busca por nome do prato ou ingredientes
- Autenticação de usuário
- Upload de imagem
- Adicionar e excluir "tags"
- Criação de usuário
  
## Rodando Localmente
Clone o projeto

```bash
  git clone https://github.com/JuliaPnS/DesafioFinal.git
```
Instale as dependências

```bash
  npm install
    axios
    bcryptjs
    express
    jsonwebtoken
    knex
    sqlite
    sqlite3
```
Inicie o aplicativo

```bash
*Local*
  npm run dev

*Produção*
  npm run start

*Seeds
npm run seed
```

## Variáveis de Ambiente
Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

AUTH_SECRET

SERVER_PORT

## Melhorias
No futuro, será feito refatorações e acréscimo de novas funcionalidades, como:
- Adicionar número de pratos
- Favoritar pratos
- Fazer pedido
- Edição de pratos já criados
- Busca por nome do prato ou ingrediente nas demais telas (sem ser na Home e Menu)
- Criação das páginas de pedido e favorito
- Logout
  
## Roadmap
As melhorias serão feitas na seguinte ordem:

- Edição de pratos já criados
- Favoritar pratos
- Adicionar número de pratos pelo input
- Fazer pedido
- Busca por nome do prato ou ingrediente nas demais telas
- Logout

## O Deploy
Foi feito no https://render.com/

## Para acessar
Entre: https://main--majestic-tarsier-fa2f7a.netlify.app/

Usuário Comum
Login: anajulia@gmail.com
Senha: 123

Usuário Admin
Login: noah@gmail.com
Senha: 123

## Screenshots
![App Screenshot](https://via.placeholder.com/468x300?text=RocketFood\Prints\print1.png)

![App Screenshot](https://via.placeholder.com/468x300?text=RocketFood\Prints\print2.png)

![App Screenshot](https://via.placeholder.com/468x300?text=RocketFood\Prints\print3.png)

## Autores
- [@JuliaPnS](https://github.com/JuliaPnS)

