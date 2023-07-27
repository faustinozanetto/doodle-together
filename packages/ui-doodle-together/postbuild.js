const fs = require('fs');
const path = require('path');

const addUseClientDeclarative = (filePath) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading index.mjs file:', err);
      process.exit(1);
    }

    const result = `"use client";\n` + data;

    fs.writeFile(filePath, result, 'utf8', (err) => {
      if (err) {
        console.error('Error writing index.mjs file:', err);
        process.exit(1);
      }
      console.log('index.mjs file updated successfully.');
    });
  });
};

const files = ['index.js', 'index.mjs'];

const main = () => {
  const fullPaths = files.map((file) => path.resolve(__dirname, 'dist', file));

  for (const fullPath of fullPaths) {
    addUseClientDeclarative(fullPath);
  }
};

main();
