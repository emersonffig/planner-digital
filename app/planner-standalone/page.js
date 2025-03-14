"use client";
import { useState, useEffect } from 'react';

export default function PlannerStandalone() {
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [activeTab, setActiveTab] = useState('daily');

  // Função para salvar dados no localStorage
  const saveToStorage = (key, data) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(data));
    }
  };

  // Função para carregar dados do localStorage
  const loadFromStorage = (key) => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    }
    return [];
  };

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    setTasks(loadFromStorage('tasks'));
    setGoals(loadFromStorage('goals'));
    setReminders(loadFromStorage('reminders'));
  }, []);

  // Funções de gerenciamento de tarefas
  const addTask = (task) => {
    const newTasks = [...tasks, { id: Date.now(), ...task }];
    setTasks(newTasks);
    saveToStorage('tasks', newTasks);
  };

  const addGoal = (goal) => {
    const newGoals = [...goals, { id: Date.now(), ...goal }];
    setGoals(newGoals);
    saveToStorage('goals', newGoals);
  };

  const addReminder = (reminder) => {
    const newReminders = [...reminders, { id: Date.now(), ...reminder }];
    setReminders(newReminders);
    saveToStorage('reminders', newReminders);
  };

  return (
    <div className="planner-container">
      <nav className="planner-nav">
        <button 
          className={`nav-button ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          Tarefas Diárias
        </button>
        <button 
          className={`nav-button ${activeTab === 'goals' ? 'active' : ''}`}
          onClick={() => setActiveTab('goals')}
        >
          Metas
        </button>
        <button 
          className={`nav-button ${activeTab === 'reminders' ? 'active' : ''}`}
          onClick={() => setActiveTab('reminders')}
        >
          Lembretes
        </button>
      </nav>

      <main className="planner-content">
        {activeTab === 'daily' && (
          <div className="daily-tasks">
            <h2>Tarefas Diárias</h2>
            {/* Componente de tarefas */}
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="goals">
            <h2>Metas</h2>
            {/* Componente de metas */}
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="reminders">
            <h2>Lembretes</h2>
            {/* Componente de lembretes */}
          </div>
        )}
      </main>

      <style jsx>{`
        .planner-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .planner-nav {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
        }

        .nav-button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background: #f5f5f5;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .nav-button.active {
          background: #1a5d1e;
          color: white;
        }

        .planner-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        h2 {
          color: #1a5d1e;
          margin-bottom: 20px;
        }

        @media (max-width: 768px) {
          .planner-nav {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
} 