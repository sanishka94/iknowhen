import React, { FormEvent, useState } from "react";
import "./App.css";

interface Task {
  id: number;
  title: string;
  status: boolean;
}

function App() {
  const [title, setTitle] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  const onCreateTask = (event: FormEvent) => {
    event.preventDefault();
    const newTask: Task = {
      id: Date.now(),
      title: title,
      status: false,
    };
    setTaskList([...taskList, newTask]);
    setTitle("");
  };

  const onTaskStatusChange = (id: number) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, status: !task.status } : task
      )
    );
  };

  const onTaskDelete = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  return (
    <div className="app">
      <header className="app_header">
        <h1>IKNOWHEN</h1><p className="version">v1.0.0</p>
      </header>
      <div className="app_body">
        <div className="create-task_body">
          <form className="create-task_form" onSubmit={onCreateTask}>
            <input
              className="create-task"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Create task..."
              required
            />
          </form>
        </div>
        <div className="task-list_body">
          {taskList.map((task) => (
            <div key={task.id} className="task_body">
              <input
                className="status"
                type="checkbox"
                checked={task.status}
                onChange={() => onTaskStatusChange(task.id)}
              />
              {task.status ? (
                <s className="task-title">{task.title}</s>
              ) : (
                <p className="task-title">{task.title}</p>
              )}
              <button
                className="task-delete_button"
                onClick={() => onTaskDelete(task.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
