"use client";
import { useState, useEffect } from 'react';

export default function PlannerPackage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  // Verificar se já está logado ao carregar
  useEffect(() => {
    const savedLogin = localStorage.getItem('plannerLogin');
    if (savedLogin) {
      setIsLoggedIn(true);
    }
  }, []);

  // Função de login
  const handleLogin = (e) => {
    e.preventDefault();
    // Aqui você pode definir o código de acesso que será enviado ao comprador
    // Por exemplo: PLANNER-2024-XXXX (onde XXXX é único para cada comprador)
    if (accessCode === 'PLANNER-2024-DEMO') {
      setIsLoggedIn(true);
      localStorage.setItem('plannerLogin', 'true');
      setError('');
    } else {
      setError('Código de acesso inválido');
    }
  };

  // Função de logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('plannerLogin');
    localStorage.removeItem('tasks');
    localStorage.removeItem('goals');
    localStorage.removeItem('reminders');
  };

  // Componente de Login
  const LoginScreen = () => (
    <div className="login-container">
      <div className="login-box">
        <h1>Planner Digital</h1>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label htmlFor="accessCode">Código de Acesso</label>
            <input
              type="text"
              id="accessCode"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              placeholder="Digite seu código de acesso"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Acessar Planner
          </button>
        </form>
      </div>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a5d1e 0%, #2e8b57 100%);
          padding: 20px;
        }

        .login-box {
          background: white;
          padding: 40px;
          border-radius: 15px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        h1 {
          color: #1a5d1e;
          text-align: center;
          margin-bottom: 30px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          margin-bottom: 8px;
          color: #333;
        }

        input {
          width: 100%;
          padding: 12px;
          border: 2px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease;
        }

        input:focus {
          border-color: #1a5d1e;
          outline: none;
        }

        .login-button {
          width: 100%;
          padding: 14px;
          background: #1a5d1e;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .login-button:hover {
          background: #154919;
        }

        .error-message {
          color: #dc3545;
          margin-bottom: 15px;
          text-align: center;
        }
      `}</style>
    </div>
  );

  // Componente do Planner
  const Planner = () => {
    const [activeTab, setActiveTab] = useState('daily');
    const [tasks, setTasks] = useState([]);
    const [goals, setGoals] = useState([]);
    const [reminders, setReminders] = useState([]);

    useEffect(() => {
      // Carregar dados salvos
      const savedTasks = localStorage.getItem('tasks');
      const savedGoals = localStorage.getItem('goals');
      const savedReminders = localStorage.getItem('reminders');

      if (savedTasks) setTasks(JSON.parse(savedTasks));
      if (savedGoals) setGoals(JSON.parse(savedGoals));
      if (savedReminders) setReminders(JSON.parse(savedReminders));
    }, []);

    const saveData = (key, data) => {
      localStorage.setItem(key, JSON.stringify(data));
    };

    return (
      <div className="planner-container">
        <header className="planner-header">
          <h1>Planner Digital</h1>
          <button onClick={handleLogout} className="logout-button">
            Sair
          </button>
        </header>

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
          {/* Conteúdo do planner baseado na aba ativa */}
        </main>

        <style jsx>{`
          .planner-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          .planner-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
          }

          .logout-button {
            padding: 8px 16px;
            background: #dc3545;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
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
        `}</style>
      </div>
    );
  };

  return isLoggedIn ? <Planner /> : <LoginScreen />;
} 