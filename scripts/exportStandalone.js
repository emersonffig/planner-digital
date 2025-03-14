const fs = require('fs');
const path = require('path');

const htmlTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Seu Planner Digital</title>
    <style>
        /* Reset CSS */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background: #f8f9fa;
        }
    </style>
</head>
<body>
    <div id="planner-root"></div>
    <script src="planner-bundle.js"></script>
</body>
</html>
`;

// Criar diretório de build se não existir
const buildDir = path.join(__dirname, '../build');
if (!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir);
}

// Salvar arquivo HTML
fs.writeFileSync(
  path.join(buildDir, 'index.html'),
  htmlTemplate
);

console.log('Arquivos exportados com sucesso!'); 