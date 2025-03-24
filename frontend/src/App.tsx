import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import ToDoList from "./components/ToDoList";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Importando os componentes do gerenciador de tarefas
import { useTasks } from "./hooks/useTasks";
import * as C from "./App.styles";
import { AddArea } from "./components/AddArea";
import { ListItem } from "./components/ListItem";
import "bootstrap/dist/css/bootstrap.min.css";
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css";

import 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';


function TaskManager() {
  // Pegando os métodos do hook de tarefas
  const { list, handleAddTask, handleTaskChange, handleEditTask, handleDeleteTask } = useTasks();

  return (
    <C.Container>
      <C.Area>
        <C.Header>📌 Gerenciador de Tarefas</C.Header>
        <AddArea onEnter={handleAddTask} />
        {list.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onChange={handleTaskChange}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </C.Area>
    </C.Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todolist" element={<ToDoList />} />
        <Route path="/task-manager" element={<TaskManager />} /> {/* Nova Rota para Gerenciador de Tarefas */}
      </Routes>
    </Router>
  );
}

export default App;
