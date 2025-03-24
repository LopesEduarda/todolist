import React from 'react';
import { useTasks } from '../hooks/useTasks';
import { AddArea } from '../components/AddArea';
import { TaskTable } from '../components/TaskTable';
import MotivationalQuote from './MotivationalQuote';

export default function TodoList() {
  const {
    list,
    loading,
    error,
    handleAddTask,
    handleTaskChange,
    handleEditTask,
    handleDeleteTask
  } = useTasks();

  return (
    <div className="container py-5">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-center" style={{ color: '#6f42c1' }}>
            Minha Lista de Tarefas
          </h2>
          <p className="text-center text-muted">Aqui você pode gerenciar suas tarefas</p>

          <AddArea onEnter={handleAddTask} />

          {loading && <p>Carregando tarefas...</p>}
          {error && <p className="text-danger">{error}</p>}

         <TaskTable
            tasks={list}
            onChange={handleTaskChange}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />

        </div>


      </div>
       <MotivationalQuote />
    </div>
  );
}
