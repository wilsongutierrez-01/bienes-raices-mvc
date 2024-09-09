import pug from 'pug';
import fs from 'fs';
import path from 'path';

const data = {
  category: { name: 'Categoría por defecto' },
  properties: []
};

const viewsDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, 'public');

// Función para compilar todas las plantillas Pug
function compilePugFiles(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // Crear directorio en outputDir
      const newOutputDir = path.join(outputDir, path.relative(viewsDir, fullPath));
      if (!fs.existsSync(newOutputDir)) {
        fs.mkdirSync(newOutputDir);
      }
      compilePugFiles(fullPath);
    } else if (path.extname(fullPath) === '.pug') {
      const compiledFunction = pug.compileFile(fullPath, { pretty: true });
      const html = compiledFunction(data);
      const outputFilePath = path.join(outputDir, path.relative(viewsDir, fullPath.replace('.pug', '.html')));
      fs.writeFileSync(outputFilePath, html);
      console.log(`Compiled ${fullPath} to ${outputFilePath}`);
    }
  });
}

compilePugFiles(viewsDir);
