import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Item } from '../types/Item';

interface TaskTableProps {
  tasks: Item[];
  onChange: (id: number, concluida: boolean) => void;
  onEdit: (id: number, title: string) => void;
  onDelete: (id: number) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks, onChange, onEdit, onDelete }) => {
  const [taskToDelete, setTaskToDelete] = useState<Item | null>(null);
  const [taskToEdit, setTaskToEdit] = useState<Item | null>(null);
  const [editedTitle, setEditedTitle] = useState('');

  const handleDelete = () => {
    if (taskToDelete) {
      onDelete(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  const handleEditSave = () => {
    if (taskToEdit) {
      onEdit(taskToEdit.id, editedTitle);
      setTaskToEdit(null);
    }
  };

 const columns: TableColumn<Item>[] = [
  {
    name: 'Título',
    selector: row => row.title,
    sortable: true,
  },
  {
    name: 'Status',
    cell: row => (
      <span
        className={`badge ${
          row.status === 'CONCLUIDA' ? 'bg-success' : 'bg-warning text-dark'
        }`}
      >
        {row.status === 'CONCLUIDA' ? 'Concluída' : 'Pendente'}
      </span>
    ),
    sortable: true,
  },
    {
    name: 'Criado em',
    selector: row => {
        const date = new Date(row.createdAt);
        return date.toLocaleString('pt-BR');
    },
    sortable: true,
    },
  {
    name: 'Concluído em',
    selector: row =>
      row.dataConclusao ? new Date(row.dataConclusao).toLocaleString() : '-',
  },
  {
    name: 'Ações',
    cell: row => (
      <div className="d-flex align-items-center gap-2">
        <input
          type="checkbox"
          className="form-check-input"
          checked={!!row.isCompleted}
          onChange={() => onChange(row.id, !row.isCompleted)}
        />
        <button
          className="btn btn-sm btn-warning"
          onClick={() => {
            setTaskToEdit(row);
            setEditedTitle(row.title);
          }}
        >
          ✏️
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => setTaskToDelete(row)}
        >
          🗑
        </button>
      </div>
    ),
  },
];


  return (
    <div className="mt-4">
      <DataTable
        columns={columns}
        data={tasks}
        pagination
        highlightOnHover
        noDataComponent="Nenhuma tarefa disponível"
        responsive
      />

      {/* Modal de confirmação */}
      {taskToDelete && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar exclusão</h5>
              </div>
              <div className="modal-body">
                <p>Deseja excluir a tarefa <strong>{taskToDelete.title}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={handleDelete}>Sim, excluir</button>
                <button className="btn btn-secondary" onClick={() => setTaskToDelete(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      {taskToEdit && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Tarefa</h5>
              </div>
              <div className="modal-body">
                <input
                  className="form-control"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleEditSave}>Salvar</button>
                <button className="btn btn-secondary" onClick={() => setTaskToEdit(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
