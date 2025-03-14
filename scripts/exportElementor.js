import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual em ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function exportLandingPage() {
  // Template para Elementor
  const elementorTemplate = {
    version: "0.4",
    title: "Landing Page Planner",
    type: "page",
    content: [
      {
        id: "hero-section",
        elType: "section",
        settings: {
          layout: "full_width",
          height: "min-height",
          custom_height: {
            unit: "px",
            size: 600
          },
          background_gradient_background: "gradient",
          background_gradient_color: "#1a5d1e",
          background_gradient_color_b: "#2e8b57",
          padding: {
            unit: "px",
            top: "100",
            right: "20",
            bottom: "100",
            left: "20"
          }
        },
        elements: [
          {
            id: "hero-content",
            elType: "column",
            settings: {
              _column_size: 100,
              align: "center",
              padding: {
                unit: "px",
                top: "20",
                right: "20",
                bottom: "20",
                left: "20"
              }
            },
            elements: [
              {
                id: "hero-title",
                elType: "widget",
                widgetType: "heading",
                settings: {
                  title: "Planner Digital",
                  align: "center",
                  title_color: "#ffffff",
                  typography_font_size: {
                    unit: "px",
                    size: 48
                  }
                }
              }
            ]
          }
        ]
      },
      {
        id: "benefits-section",
        elType: "section",
        settings: {
          layout: "boxed",
          padding: {
            unit: "px",
            top: "80",
            right: "20",
            bottom: "80",
            left: "20"
          }
        },
        elements: [
          {
            id: "benefits-content",
            elType: "column",
            settings: {
              _column_size: 100
            },
            elements: [
              {
                id: "benefits-title",
                elType: "widget",
                widgetType: "heading",
                settings: {
                  title: "Benefícios",
                  align: "center"
                }
              }
            ]
          }
        ]
      }
    ]
  };

  // Criar diretório de exportação
  const exportDir = path.join(__dirname, '../exports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir);
  }

  // Salvar template
  fs.writeFileSync(
    path.join(exportDir, 'elementor-template.json'),
    JSON.stringify(elementorTemplate, null, 2)
  );

  // Criar arquivo de instruções
  const instructions = `
# Instruções para Importar no Elementor

1. No WordPress, vá para Templates > Modelos Salvos
2. Clique em "Importar Modelos"
3. Selecione o arquivo 'elementor-template.json'
4. Após importar, vá para Páginas > Adicionar Nova
5. Clique em "Editar com Elementor"
6. Insira o template importado

## Cores do Tema
- Verde Principal: #1a5d1e
- Verde Secundário: #2e8b57
- Vermelho CTA: #8B0000

## Fontes Recomendadas
- Títulos: Montserrat
- Texto: Open Sans
`;

  fs.writeFileSync(
    path.join(exportDir, 'INSTRUCOES.md'),
    instructions
  );

  console.log('Exportação concluída! Arquivos gerados em:', exportDir);
}

// Executar exportação
exportLandingPage();

export default exportLandingPage; 