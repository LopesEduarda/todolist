# Task Manager

## 📌 Descrição
Este projeto é uma aplicação web para gerenciamento de tarefas, permitindo criar, listar, editar e excluir tarefas. As tarefas possuem os seguintes campos:
- **Título**
- **Data de criação**
- **Data de conclusão**
- **Status** (pendente ou concluída)

A listagem de tarefas é ordenada pela data de criação, mostrando primeiro as tarefas mais recentes.

## 🚀 Tecnologias Utilizadas
- **Backend**: Node js com Nest
- **Banco de Dados**: Postgres
- **Frontend**: React com TypeScript
- **API**: RESTful
- **Containerização**: Docker e Docker Compose

## 🛠️ Como Executar o Projeto
### 🔧 Pré-requisitos
Certifique-se de ter instalados em sua máquina:
- [Docker](https://www.docker.com/) e Docker Compose

### 🛋️ Clonando o Repositório
```bash
git clone git@github.com:LopesEduarda/todolist.git
cd todolist
```

### 🐫 Subindo a Aplicação com Docker
1. Para subir a aplicação, execute:
```bash
docker-compose up --build
```
2. A aplicação estará acessível nos seguintes endereços:
   - **Backend**: `http://localhost:3000`
   - **Frontend**: `http://localhost:5173`

---

### **1️⃣ Subir os containers**
Se os containers ainda não estiverem rodando, suba a aplicação com:
```sh
docker-compose up -d --build
```



## 📌 Endpoints da API
Os endpoints da API ficam acessíveis através da porta `3000`.

### 📌 Criar um usuário
`POST http://localhost:3000/users/register`
```json
{
  "email": "teste@gmail.com",
  "password": "senha123"
}

```

### 📌 Login
`POST http://localhost:3000/auth/login`
```json
{
  "email": "teste@gmail.com",
  "password": "senha123"
}

```

Abaixo, é necessário passar o token para as requisições para ser permitido criar / listar / editar / deletar uma tarefa.


### 📌 Criar uma tarefa
`POST http://localhost:3000/tasks`
```json
{
  "title": "Testando tarefa :)"
}
```

### 📌 Listar todas as tarefas
`GET http://localhost:3000/tasks`

### 📌 Atualizar uma tarefa
`PUT http://localhost:8081/tasks/{id}`
```json
{
  "title": "Testando tarefa !!!"
}

```

### 📌 Deletar uma tarefa
`DELETE http://localhost:8081/tarefas/{id}`

---



## 💎 Rodando o Frontend (React com TypeScript)
O frontend foi desenvolvido em **React com TypeScript** .

### **2️⃣ Desenvolvimento local **
Para rodar o frontend diretamente no seu ambiente local, siga estes passos:

1. Acesse a pasta do frontend:
```sh
cd frontend
```
2. Instale as dependências:
```sh
npm install
```
3. Inicie o servidor de desenvolvimento:
```sh
npm run start
```
Isso abrirá automaticamente o navegador em `http://localhost:5173`.



```


![image](https://github.com/user-attachments/assets/4966de2b-3da4-45ee-bafa-eeb809047833)


```


![image](https://github.com/user-attachments/assets/2d0f8f8a-b129-449c-8d53-ae3c3fd2753d)




