"use client";

import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Link from "next/link";

export default function DailyPlannerPage() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState("");
  const [taskCategory, setTaskCategory] = useState("pessoal");

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('plannerTasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('plannerTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim()) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
        category: taskCategory,
        createdAt: new Date().toISOString()
      };
      setTasks([...tasks, newTask]);
      setTaskText("");
    }
  };

  const toggleTask = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? {...task, completed: !task.completed} : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getCategoryColor = (category) => {
    const colors = {
      pessoal: "#4CAF50",
      trabalho: "#2196F3",
      estudo: "#9C27B0",
      saude: "#F44336"
    };
    return colors[category] || colors.pessoal;
  };

  return (
    <div className="planner-container">
      <div className="planner-board">
        <h1>Planejamento Diário</h1>
        
        <div className="calendar-section">
          <div className="stats-container">
            <div className="stat-box">
              <h3>Total de Tarefas</h3>
              <p>{tasks.length}</p>
            </div>
            <div className="stat-box">
              <h3>Concluídas</h3>
              <p>{tasks.filter(task => task.completed).length}</p>
            </div>
            <div className="stat-box">
              <h3>Pendentes</h3>
              <p>{tasks.filter(task => !task.completed).length}</p>
            </div>
          </div>
        </div>

        <div className="events-section">
          <h2>Adicionar Nova Tarefa</h2>
          <div className="add-event">
            <select 
              value={taskCategory}
              onChange={(e) => setTaskCategory(e.target.value)}
              className="event-input"
              style={{ marginRight: '10px' }}
            >
              <option value="pessoal">Pessoal</option>
              <option value="trabalho">Trabalho</option>
              <option value="estudo">Estudo</option>
              <option value="saude">Saúde</option>
            </select>
            <input
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Digite sua tarefa aqui..."
              className="event-input"
            />
            <button onClick={addTask} className="add-button">
              Adicionar
            </button>
          </div>

          <div className="events-list">
            {tasks.map((task) => (
              <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    className="task-checkbox"
                  />
                  <div className="task-details">
                    <span className="task-text">{task.text}</span>
                  </div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    className="delete-button"
                    title="Excluir tarefa"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .stats-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .stat-box {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
        }

        .stat-box h3 {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }

        .stat-box p {
          margin: 10px 0 0;
          font-size: 1.5rem;
          font-weight: bold;
          color: #333;
        }

        .task-item {
          background: white;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          border-left: 4px solid #4CAF50;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .task-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .delete-button {
          background: #ff4444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          opacity: 0;
        }

        .task-item:hover .delete-button {
          opacity: 1;
        }

        .delete-button:hover {
          background: #ff0000;
          transform: scale(1.1);
        }

        .task-checkbox {
          width: 18px;
          height: 18px;
        }

        .task-text {
          flex: 1;
        }

        .task-category {
          font-size: 0.8rem;
          color: #666;
          background: #f0f0f0;
          padding: 2px 8px;
          border-radius: 4px;
        }

        .completed {
          background-color: #f8f9fa;
        }

        .completed .task-text {
          text-decoration: line-through;
          color: #6c757d;
        }

        .event-item {
          transition: all 0.3s ease;
        }

        .event-item:hover {
          transform: translateX(5px);
        }

        @media (max-width: 768px) {
          .stats-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
} 