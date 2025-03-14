"use client";

import { useState, useEffect } from "react";

export default function RemindersPage() {
  const [reminders, setReminders] = useState([]);
  const [reminderText, setReminderText] = useState("");
  const [reminderDate, setReminderDate] = useState("");

  // Carregar lembretes do localStorage
  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('plannerReminders')) || [];
    setReminders(savedReminders);
  }, []);

  // Salvar lembretes no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('plannerReminders', JSON.stringify(reminders));
  }, [reminders]);

  const addReminder = () => {
    if (reminderText.trim() && reminderDate) {
      const newReminder = {
        id: Date.now(),
        text: reminderText,
        date: reminderDate,
        createdAt: new Date().toISOString()
      };
      setReminders([...reminders, newReminder]);
      setReminderText("");
      setReminderDate("");
    }
  };

  const deleteReminder = (reminderId) => {
    setReminders(reminders.filter(reminder => reminder.id !== reminderId));
  };

  return (
    <div className="planner-container">
      <div className="planner-board">
        <h1>Lembretes</h1>
        <div className="add-reminder">
          <input
            type="text"
            value={reminderText}
            onChange={(e) => setReminderText(e.target.value)}
            placeholder="Novo lembrete..."
            className="event-input"
          />
          <input
            type="datetime-local"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            className="event-input"
          />
          <button onClick={addReminder} className="add-button">
            Adicionar
          </button>
        </div>
        <div className="events-list">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="reminder-item">
              <div className="reminder-content">
                <div className="reminder-details">
                  <span className="reminder-text">{reminder.text}</span>
                  <span className="reminder-date">
                    {new Date(reminder.date).toLocaleString('pt-BR')}
                  </span>
                </div>
                <button 
                  onClick={() => deleteReminder(reminder.id)}
                  className="delete-button"
                  title="Excluir lembrete"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .reminder-item {
          background: white;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          border-left: 4px solid #4CAF50;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .reminder-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .reminder-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .reminder-date {
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

        .reminder-item:hover .delete-button {
          opacity: 1;
        }

        .delete-button:hover {
          background: #ff0000;
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
}
