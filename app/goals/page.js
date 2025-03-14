"use client";

import { useState, useEffect } from "react";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [goalText, setGoalText] = useState("");
  const [goalDate, setGoalDate] = useState("");

  // Carregar metas do localStorage
  useEffect(() => {
    const savedGoals = JSON.parse(localStorage.getItem('plannerGoals')) || [];
    setGoals(savedGoals);
  }, []);

  // Salvar metas no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('plannerGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (goalText.trim() && goalDate) {
      const newGoal = {
        id: Date.now(),
        text: goalText,
        date: goalDate,
        completed: false,
        createdAt: new Date().toISOString()
      };
      setGoals([...goals, newGoal]);
      setGoalText("");
      setGoalDate("");
    }
  };

  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const toggleGoal = (goalId) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? {...goal, completed: !goal.completed} : goal
    ));
  };

  return (
    <div className="planner-container">
      <div className="planner-board">
        <h1>Minhas Metas</h1>
        
        <div className="add-event">
          <input
            type="text"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            placeholder="Digite sua meta..."
            className="event-input"
          />
          <input
            type="date"
            value={goalDate}
            onChange={(e) => setGoalDate(e.target.value)}
            className="event-input"
          />
          <button onClick={addGoal} className="add-button">
            Adicionar
          </button>
        </div>

        <div className="events-list">
          {goals.map((goal) => (
            <div key={goal.id} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
              <div className="goal-content">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoal(goal.id)}
                  className="goal-checkbox"
                />
                <div className="goal-details">
                  <span className="goal-text">{goal.text}</span>
                  <span className="goal-date">
                    Meta para: {new Date(goal.date).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <button 
                  onClick={() => deleteGoal(goal.id)}
                  className="delete-button"
                  title="Excluir meta"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .goal-item {
          background: white;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          border-left: 4px solid #4CAF50;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .goal-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .goal-checkbox {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }

        .goal-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .goal-text {
          font-size: 1.1rem;
          color: #333;
        }

        .goal-date {
          font-size: 0.9rem;
          color: #666;
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

        .goal-item:hover .delete-button {
          opacity: 1;
        }

        .delete-button:hover {
          background: #ff0000;
          transform: scale(1.1);
        }

        .completed {
          background-color: #f8f9fa;
          border-left-color: #6c757d;
        }

        .completed .goal-text {
          text-decoration: line-through;
          color: #6c757d;
        }

        .add-event {
          display: flex;
          gap: 10px;
          margin-bottom: 30px;
        }

        .event-input {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
        }

        @media (max-width: 768px) {
          .add-event {
            flex-direction: column;
          }
          
          .goal-content {
            flex-direction: column;
            align-items: flex-start;
          }

          .delete-button {
            opacity: 1;
            align-self: flex-end;
            margin-top: 10px;
          }
        }
      `}</style>
    </div>
  );
}
