"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [eventText, setEventText] = useState("");

  // Carregar eventos do localStorage
  useEffect(() => {
    const savedEvents = JSON.parse(localStorage.getItem('plannerEvents')) || {};
    setEvents(savedEvents);
  }, []);

  // Salvar eventos no localStorage sempre que houver mudanças
  useEffect(() => {
    localStorage.setItem('plannerEvents', JSON.stringify(events));
  }, [events]);

  const addEvent = () => {
    if (eventText.trim()) {
      const dateKey = date.toDateString();
      const newEvent = {
        id: Date.now(),
        text: eventText,
        createdAt: new Date().toISOString()
      };
      setEvents(prev => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent]
      }));
      setEventText("");
    }
  };

  const deleteEvent = (dateKey, eventId) => {
    setEvents(prev => ({
      ...prev,
      [dateKey]: prev[dateKey].filter(event => event.id !== eventId)
    }));
  };

  return (
    <div className="planner-container">
      <div className="planner-board">
        <h1>Calendário</h1>
        <div className="calendar-wrapper">
          <Calendar
            onChange={setDate}
            value={date}
            className="custom-calendar"
          />
        </div>
        <div className="events-section">
          <h2>Eventos para {date.toLocaleDateString('pt-BR')}</h2>
          <div className="add-event">
            <input
              type="text"
              value={eventText}
              onChange={(e) => setEventText(e.target.value)}
              placeholder="Adicionar novo evento..."
              className="event-input"
            />
            <button onClick={addEvent} className="add-button">
              Adicionar
            </button>
          </div>
          <div className="events-list">
            {events[date.toDateString()]?.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-content">
                  <span className="event-text">{event.text}</span>
                  <button 
                    onClick={() => deleteEvent(date.toDateString(), event.id)}
                    className="delete-button"
                    title="Excluir evento"
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
        .calendar-wrapper {
          display: flex;
          justify-content: center;
          margin: 20px 0;
          padding: 0 20px;
        }

        .custom-calendar {
          width: 100%;
          max-width: 600px;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 10px;
        }

        /* Estilos para melhorar a aparência do calendário */
        :global(.react-calendar) {
          width: 100%;
          border: none;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        :global(.react-calendar__tile--active) {
          background: #4CAF50 !important;
        }

        :global(.react-calendar__tile--now) {
          background: #e8f5e9;
        }

        :global(.react-calendar__tile:enabled:hover) {
          background: #c8e6c9;
        }

        :global(.react-calendar__navigation button:enabled:hover) {
          background: #f5f5f5;
        }

        @media (max-width: 768px) {
          .calendar-wrapper {
            padding: 0 10px;
          }
        }

        .event-item {
          background: white;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          border-left: 4px solid #4CAF50;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: all 0.3s ease;
        }

        .event-content {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .event-text {
          flex: 1;
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

        .event-item:hover .delete-button {
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
