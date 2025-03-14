'use client'

export default function StyledLayout({ children }) {
  return (
    <div className="planner-container">
      <nav className="top-nav">
        <div className="nav-content">
          <div className="logo">
            <h2>Planner Digital</h2>
          </div>
          <ul className="nav-links">
            <li><a href="/">Início</a></li>
            <li className="separator">|</li>
            <li><a href="/weekly">Planejamento Semanal</a></li>
            <li className="separator">|</li>
            <li><a href="/tasks">Tarefas</a></li>
            <li className="separator">|</li>
            <li><a href="/calendar">Calendário</a></li>
            <li className="separator">|</li>
            <li><a href="/goals">Metas</a></li>
            <li className="separator">|</li>
            <li><a href="/reminders">Lembretes</a></li>
          </ul>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: system-ui, -apple-system, sans-serif;
          background: #f5f5f5;
          min-height: 100vh;
        }

        .planner-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .top-nav {
          background: #1a1a1a;
          color: white;
          padding: 1rem 0;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .logo {
          text-align: center;
          padding-bottom: 0.5rem;
        }

        .logo h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #fff;
          margin: 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .nav-links {
          display: flex;
          gap: 0.5rem;
          list-style: none;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          width: 100%;
          margin: 0;
          padding: 0;
        }

        .separator {
          color: rgba(255,255,255,0.3);
          font-weight: 200;
        }

        .nav-links a {
          color: white;
          text-decoration: none;
          font-size: 1rem;
          transition: all 0.3s ease;
          padding: 0.5rem 1rem;
          border-radius: 4px;
        }

        .nav-links a:hover {
          color: #4CAF50;
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }

        .nav-links a:active {
          transform: translateY(0);
        }

        .main-content {
          flex: 1;
          max-width: 1200px;
          width: 100%;
          margin: 2rem auto;
          padding: 0 1rem;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        @media (max-width: 1024px) {
          .nav-content {
            padding: 0 1rem;
          }
          
          .main-content {
            margin: 1rem;
          }
        }

        @media (max-width: 768px) {
          .logo h2 {
            font-size: 1.75rem;
          }

          .nav-links {
            gap: 0.25rem;
          }

          .nav-links a {
            padding: 0.25rem 0.5rem;
            font-size: 0.9rem;
          }

          .separator {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .logo h2 {
            font-size: 1.5rem;
          }

          .nav-links {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }

          .nav-links a {
            width: 100%;
            text-align: center;
            padding: 0.5rem;
          }

          .separator {
            display: none;
          }

          .main-content {
            margin: 0.5rem;
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  )
} 