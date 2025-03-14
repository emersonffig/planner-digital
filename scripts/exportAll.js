const fs = require('fs');
const path = require('path');

// Criar diretório de build se não existir
const buildDir = path.join(__dirname, '../build');
if (!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir);
}

// HTML template
const htmlTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Planner Digital</title>
    <style>
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
    <script src="planner.js"></script>
</body>
</html>
`;

// Copiar arquivos necessários
fs.writeFileSync(
    path.join(buildDir, 'index.html'),
    htmlTemplate
);

// Copiar o arquivo do planner
const plannerContent = fs.readFileSync(
    path.join(__dirname, '../app/standalone/planner-package.js'),
    'utf8'
);
fs.writeFileSync(
    path.join(buildDir, 'planner.js'),
    plannerContent
);

console.log('Exportação concluída! Arquivos gerados na pasta "build"'); 