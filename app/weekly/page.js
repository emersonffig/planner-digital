"use client";

import { useState } from "react";

export default function WeeklyPlanning() {
  return (
    <div className="weekly-container">
      <h1>Planejamento Semanal</h1>
      
      <div className="week-grid">
        {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day) => (
          <div key={day} className="day-card">
            <h2>{day}</h2>
            <div className="time-slots">
              <div className="time-slot">
                <span className="time">Manhã</span>
                <textarea placeholder="Atividades da manhã"></textarea>
              </div>
              <div className="time-slot">
                <span className="time">Tarde</span>
                <textarea placeholder="Atividades da tarde"></textarea>
              </div>
              <div className="time-slot">
                <span className="time">Noite</span>
                <textarea placeholder="Atividades da noite"></textarea>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .weekly-container {
          padding: 2rem;
        }

        h1 {
          color: #333;
          margin-bottom: 2rem;
          text-align: center;
        }

        .week-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          padding: 1rem;
        }

        .day-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }

        .day-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .day-card h2 {
          color: #2c3e50;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #e0e0e0;
        }

        .time-slots {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .time-slot {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .time {
          font-weight: 500;
          color: #666;
        }

        textarea {
          width: 100%;
          min-height: 80px;
          padding: 0.5rem;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          resize: vertical;
          font-family: inherit;
        }

        textarea:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
        }

        @media (max-width: 768px) {
          .weekly-container {
            padding: 1rem;
          }

          .week-grid {
            grid-template-columns: 1fr;
          }

          .day-card {
            padding: 1rem;
          }

          textarea {
            min-height: 60px;
          }
        }
      `}</style>
    </div>
  )
}
