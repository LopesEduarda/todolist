import axios from "axios";
import { Item, UpdatedTask } from "../types/Item";

const API_URL = "http://localhost:3000/tasks";

// 🔹 Função para obter o Token JWT e userId do LocalStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Usuário não autenticado");

  return { Authorization: `Bearer ${token}` };
};

// 🔹 Função para obter o userId do LocalStorage
const getUserId = () => {
  const userId = localStorage.getItem("userId");
  console.log('user id > ', userId)
  if (!userId) throw new Error("Usuário não autenticado");

  return userId;
};

// 🔹 Listar tarefas do usuário
export const listaTarefas = async (): Promise<Item[]> => {
  const userId = getUserId();

  const response = await axios.get(`${API_URL}`, {
    params: { userId },
    headers: getAuthHeaders(),
  });

   console.log("Tarefas recebidas do backend:", response.data);

  return response.data;
};

// 🔹 Criar nova tarefa
export const adicionaTarefa = async (title: string): Promise<Item> => {

  const response = await axios.post(
    `${API_URL}`,
    { title },
    { headers: getAuthHeaders() }
  );

  return response.data;
};

export const atualizaTarefa = async (
  id: number,
  title: string,
  isCompleted: boolean
): Promise<UpdatedTask> => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    { title, isCompleted },
    { headers: getAuthHeaders() }
  );

  const { isCompleted: completed, updatedAt } = response.data;

  return {
    isCompleted: completed,
    dataConclusao: completed ? updatedAt : null,
    status: completed ? "CONCLUIDA" : "PENDENTE",
  };
};




// 🔹 Editar título e descrição da tarefa
export const atualizaTitulo = async (id: number, title: string): Promise<Item> => {
  const userId = getUserId();
  if (!userId) throw new Error("Usuário não autenticado");

  const response = await axios.put(`${API_URL}/${id}`, { title }, {
    headers: getAuthHeaders(),
  });

  return response.data;
};


// 🔹 Deletar tarefa
export const deleteTask = async (id: number): Promise<void> => {
  const userId = getUserId();

  await axios.delete(`${API_URL}/${id}`, {
    data: { userId }, // Enviando userId no body da requisição DELETE
    headers: getAuthHeaders(),
  });
};
