const fs = require('fs');
const path = require('path');

// Lê o conteúdo do arquivo da landing page
const landingPageContent = fs.readFileSync(
  path.join(__dirname, '../app/landing/page.js'),
  'utf8'
);

// Estrutura do JSON
const landingPageData = {
  version: "1.0",
  timestamp: new Date().toISOString(),
  content: {
    hero: {
      title: "Planner Digital",
      subtitle: "Organize sua vida de forma eficiente",
      // ... outros dados do hero
    },
    benefits: [
      {
        title: "Organização Simplificada",
        description: "Gerencie suas tarefas diárias com facilidade"
      },
      // ... outros benefícios
    ],
    features: [
      {
        title: "Planejamento Diário",
        description: "Organize suas tarefas por dia"
      },
      // ... outras features
    ],
    pricing: {
      price: "29.90",
      currency: "BRL",
      features: [
        "Acesso vitalício",
        "Todas as funcionalidades",
        // ... outros itens
      ]
    },
    guarantee: {
      days: 7,
      description: "Garantia incondicional de 7 dias"
    }
  },
  styles: {
    // Estilos da landing page
    colors: {
      primary: "#1a5d1e",
      secondary: "#f5f5f5",
      // ... outras cores
    },
    typography: {
      // ... configurações de tipografia
    }
  }
};

// Salva o JSON
fs.writeFileSync(
  path.join(__dirname, '../public/landing-page.json'),
  JSON.stringify(landingPageData, null, 2)
);

console.log('Landing page exportada com sucesso!'); 