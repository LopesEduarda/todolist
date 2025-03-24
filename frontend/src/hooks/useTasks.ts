import { useEffect, useState } from "react";
import { Item } from "../types/Item";
import {
  adicionaTarefa,
  atualizaTarefa,
  atualizaTitulo,
  deleteTask,
  listaTarefas
} from "../services/taskService";

export const useTasks = () => {
  const [list, setList] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const tasks: Item[] = await listaTarefas();
        setList(tasks);
      } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        setError("Erro ao carregar tarefas.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // 🔹 Criar nova tarefa
  const handleAddTask = async (title: string) => {
    try {
      const newTask = await adicionaTarefa(title);
      setList((prevList) => [newTask, ...prevList]);
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
      setError("Erro ao adicionar tarefa.");
    }
  };

  // 🔹 Marcar tarefa como concluída
const handleTaskChange = async (id: number, isCompleted: boolean) => {
  try {
    const task = list.find(task => task.id === id);
    if (!task) return;

    const updatedTask = await atualizaTarefa(id, task.title, isCompleted);

    setList((prevList) =>
      prevList.map(task =>
        task.id === id
          ? {
              ...task,
              isCompleted: updatedTask.isCompleted,
              status: updatedTask.status,
              dataConclusao: updatedTask.dataConclusao,
            }
          : task
      )
    );
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    setError("Erro ao atualizar tarefa.");
  }
};




 const handleEditTask = async (id: number, title: string) => {
  try {
    const updatedTask = await atualizaTitulo(id, title);

    setList((prevList) =>
      prevList.map((task) =>
        task.id === id ? { ...task, title: updatedTask.title } : task
      )
    );
  } catch (error) {
    console.error("Erro ao editar a tarefa:", error);
  }
};


  // 🔹 Deletar tarefa
  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
      setList((prevList) => prevList.filter(task => task.id !== id));
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
      setError("Erro ao deletar tarefa.");
    }
  };

  return { list, loading, error, handleAddTask, handleTaskChange, handleEditTask, handleDeleteTask };
};