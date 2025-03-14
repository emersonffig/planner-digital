'use client'
import { useState, useEffect } from 'react'

export default function HomePage() {
  // Estados para gerenciar os dados
  const [progress, setProgress] = useState(0)
  const [goals, setGoals] = useState([])
  const [reminders, setReminders] = useState([])
  const [newGoal, setNewGoal] = useState('')
  const [newReminder, setNewReminder] = useState({ text: '', date: '', time: '' })
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [isAddingReminder, setIsAddingReminder] = useState(false)

  // Carregar dados do localStorage ao iniciar
  useEffect(() => {
    const savedProgress = localStorage.getItem('weeklyProgress')
    const savedGoals = localStorage.getItem('goals')
    const savedReminders = localStorage.getItem('reminders')

    if (savedProgress) setProgress(JSON.parse(savedProgress))
    if (savedGoals) setGoals(JSON.parse(savedGoals))
    if (savedReminders) setReminders(JSON.parse(savedReminders))
  }, [])

  // Salvar dados no localStorage quando mudarem
  useEffect(() => {
    localStorage.setItem('weeklyProgress', JSON.stringify(progress))
    localStorage.setItem('goals', JSON.stringify(goals))
    localStorage.setItem('reminders', JSON.stringify(reminders))
  }, [progress, goals, reminders])

  // Funções para gerenciar metas
  const addGoal = (e) => {
    e.preventDefault()
    if (newGoal.trim()) {
      setGoals([...goals, { id: Date.now(), text: newGoal, completed: false }])
      setNewGoal('')
      setIsAddingGoal(false)
    }
  }

  const toggleGoal = (id) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ))
  }

  const removeGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id))
  }

  // Funções para gerenciar lembretes
  const addReminder = (e) => {
    e.preventDefault()
    if (newReminder.text.trim() && newReminder.date && newReminder.time) {
      setReminders([...reminders, { 
        id: Date.now(), 
        ...newReminder,
        datetime: `${newReminder.date}T${newReminder.time}`
      }])
      setNewReminder({ text: '', date: '', time: '' })
      setIsAddingReminder(false)
    }
  }

  const removeReminder = (id) => {
    setReminders(reminders.filter(reminder => reminder.id !== id))
  }

  // Atualizar progresso
  const updateProgress = (value) => {
    setProgress(Math.min(Math.max(value, 0), 100))
  }

  return (
    <div className="dashboard">
      <header className="welcome-section">
        <h1 className="welcome-text">Bem-vindo ao seu Planner Digital</h1>
        <p>Organize seu dia e alcance seus objetivos</p>
      </header>

      <div className="quick-actions">
        <div className="action-card">
          <h3>Planejamento Semanal</h3>
          <p>Visualize e organize sua semana</p>
          <a href="/weekly" className="action-button">Ver Agenda</a>
        </div>
        <div className="action-card">
          <h3>Tarefas Pendentes</h3>
          <p>Gerencie suas atividades</p>
          <a href="/tasks" className="action-button">Ver Tarefas</a>
        </div>
        <div className="action-card">
          <h3>Calendário</h3>
          <p>Eventos e compromissos</p>
          <a href="/calendar" className="action-button">Ver Calendário</a>
        </div>
      </div>

      <div className="overview-grid">
        <section className="overview-card progress">
          <h3>Progresso Semanal</h3>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{width: `${progress}%`}}
              >
                {progress}%
              </div>
            </div>
            <input 
              type="range" 
              value={progress} 
              onChange={(e) => updateProgress(Number(e.target.value))}
              min="0"
              max="100"
              className="progress-slider"
            />
          </div>
        </section>

        <section className="overview-card goals">
          <h3>Metas em Destaque</h3>
          <ul className="goals-list">
            {goals.map(goal => (
              <li key={goal.id} className={goal.completed ? 'completed' : ''}>
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoal(goal.id)}
                />
                <span>{goal.text}</span>
                <button onClick={() => removeGoal(goal.id)} className="remove-btn">×</button>
              </li>
            ))}
          </ul>
          {isAddingGoal ? (
            <form onSubmit={addGoal} className="add-form">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Nova meta..."
                autoFocus
              />
              <button type="submit">Adicionar</button>
              <button type="button" onClick={() => setIsAddingGoal(false)}>Cancelar</button>
            </form>
          ) : (
            <button onClick={() => setIsAddingGoal(true)} className="add-btn">+ Adicionar Meta</button>
          )}
        </section>

        <section className="overview-card reminders">
          <h3>Próximos Lembretes</h3>
          <ul className="reminders-list">
            {reminders
              .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
              .map(reminder => (
                <li key={reminder.id}>
                  <span>{reminder.text}</span>
                  <span className="reminder-time">
                    {new Date(reminder.datetime).toLocaleString()}
                  </span>
                  <button onClick={() => removeReminder(reminder.id)} className="remove-btn">×</button>
                </li>
              ))}
          </ul>
          {isAddingReminder ? (
            <form onSubmit={addReminder} className="add-form">
              <input
                type="text"
                value={newReminder.text}
                onChange={(e) => setNewReminder({...newReminder, text: e.target.value})}
                placeholder="Novo lembrete..."
                autoFocus
              />
              <input
                type="date"
                value={newReminder.date}
                onChange={(e) => setNewReminder({...newReminder, date: e.target.value})}
              />
              <input
                type="time"
                value={newReminder.time}
                onChange={(e) => setNewReminder({...newReminder, time: e.target.value})}
              />
              <button type="submit">Adicionar</button>
              <button type="button" onClick={() => setIsAddingReminder(false)}>Cancelar</button>
            </form>
          ) : (
            <button onClick={() => setIsAddingReminder(true)} className="add-btn">+ Adicionar Lembrete</button>
          )}
        </section>
      </div>

      <style jsx>{`
        .dashboard {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .welcome-section {
          text-align: center;
          margin-bottom: 3rem;
          padding: 2rem;
          background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .welcome-text {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #ffffff;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .welcome-section p {
          font-size: 1.2rem;
          opacity: 0.9;
          color: #ffffff;
        }

        .quick-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }

        .action-card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          text-align: center;
          transition: transform 0.3s ease;
        }

        .action-card:hover {
          transform: translateY(-5px);
        }

        .action-card h3 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .action-card p {
          color: #666;
          margin-bottom: 1rem;
        }

        .action-button {
          display: inline-block;
          padding: 0.8rem 1.5rem;
          background: #4CAF50;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          transition: background 0.3s ease;
        }

        .action-button:hover {
          background: #45a049;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .overview-card {
          background: white;
          padding: 1.5rem;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .overview-card h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #f0f0f0;
        }

        .progress-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .progress-slider {
          width: 100%;
          height: 5px;
          -webkit-appearance: none;
          background: #f0f0f0;
          border-radius: 5px;
          outline: none;
        }

        .progress-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 15px;
          height: 15px;
          background: #4CAF50;
          border-radius: 50%;
          cursor: pointer;
        }

        .goals-list, .reminders-list {
          list-style: none;
          padding: 0;
        }

        .goals-list li, .reminders-list li {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem;
          border-bottom: 1px solid #f0f0f0;
        }

        .goals-list li.completed span {
          text-decoration: line-through;
          color: #888;
        }

        .add-form {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .add-form input {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .add-btn {
          width: 100%;
          padding: 0.5rem;
          background: none;
          border: 2px dashed #ddd;
          color: #666;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }

        .add-btn:hover {
          border-color: #4CAF50;
          color: #4CAF50;
        }

        .remove-btn {
          background: none;
          border: none;
          color: #ff4444;
          cursor: pointer;
          font-size: 1.2rem;
          padding: 0 0.5rem;
        }

        .reminder-time {
          font-size: 0.8rem;
          color: #666;
          margin-left: auto;
        }

        @media (max-width: 768px) {
          .dashboard {
            padding: 1rem;
          }

          .welcome-section {
            padding: 1.5rem;
            margin-bottom: 2rem;
          }

          .welcome-text {
            font-size: 2rem;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
} 