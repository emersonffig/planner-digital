'use client'

export default function HomePage() {
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
          <div className="progress-bar">
            <div className="progress-fill" style={{width: '65%'}}>65%</div>
          </div>
          <p>Tarefas completadas esta semana</p>
        </section>

        <section className="overview-card goals">
          <h3>Metas em Destaque</h3>
          <ul className="goals-list">
            <li>✨ Completar projeto principal</li>
            <li>📚 Ler 2 capítulos do livro</li>
            <li>💪 Exercícios 3x na semana</li>
          </ul>
        </section>

        <section className="overview-card reminders">
          <h3>Próximos Lembretes</h3>
          <ul className="reminders-list">
            <li>📅 Reunião de equipe - 14:00</li>
            <li>🎯 Entrega do relatório - Amanhã</li>
            <li>🏃‍♂️ Academia - 18:00</li>
          </ul>
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

        .progress-bar {
          background: #f0f0f0;
          border-radius: 10px;
          height: 20px;
          margin: 1rem 0;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(90deg, #4CAF50, #45a049);
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 0.8rem;
          transition: width 0.3s ease;
        }

        .goals-list, .reminders-list {
          list-style: none;
          padding: 0;
        }

        .goals-list li, .reminders-list li {
          padding: 0.8rem 0;
          border-bottom: 1px solid #f0f0f0;
          color: #444;
        }

        .goals-list li:last-child, .reminders-list li:last-child {
          border-bottom: none;
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