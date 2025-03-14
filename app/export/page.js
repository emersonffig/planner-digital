"use client";
import { useState } from 'react';

export default function ExportPage() {
  const [downloading, setDownloading] = useState(false);

  const handleExport = async () => {
    try {
      setDownloading(true);
      const response = await fetch('/api/export-elementor');
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'elementor-template.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Erro ao exportar:', error);
      alert('Erro ao exportar o template');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="export-container">
      <h1>Exportar Template para Elementor</h1>
      <button 
        onClick={handleExport}
        disabled={downloading}
        className="export-button"
      >
        {downloading ? 'Exportando...' : 'Baixar Template'}
      </button>

      <div className="instructions">
        <h2>Instruções:</h2>
        <ol>
          <li>Clique no botão acima para baixar o template</li>
          <li>No WordPress, acesse Templates e Modelos Salvos</li>
          <li>Clique em &quot;Importar Modelos&quot;</li>
          <li>Selecione o arquivo baixado</li>
          <li>Após importar, use o template em qualquer página</li>
        </ol>
      </div>

      <style jsx>{`
        .export-container {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
        }

        h1 {
          color: #1a5d1e;
          margin-bottom: 30px;
        }

        .export-button {
          background: #1a5d1e;
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .export-button:hover {
          background: #154919;
        }

        .export-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .instructions {
          margin-top: 40px;
          padding: 20px;
          background: #f5f5f5;
          border-radius: 8px;
        }

        .instructions h2 {
          color: #333;
          margin-bottom: 15px;
        }

        ol {
          padding-left: 20px;
        }

        li {
          margin: 10px 0;
          color: #666;
        }
      `}</style>
    </div>
  );
} 