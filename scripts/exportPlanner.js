const fs = require('fs');
const path = require('path');

// HTML template para a versão standalone
const htmlTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Planner Digital</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="planner-root"></div>
    <script src="planner.js"></script>
</body>
</html>
`;

// Criar diretório de build se não existir
const buildDir = path.join(__dirname, '../build');
if (!fs.existsSync(buildDir)){
    fs.mkdirSync(buildDir);
}

// Salvar arquivos
fs.writeFileSync(
  path.join(buildDir, 'index.html'),
  htmlTemplate
);

// Copiar outros arquivos necessários
// ... (código para copiar JS, CSS e assets)

console.log('Planner exportado com sucesso!'); 