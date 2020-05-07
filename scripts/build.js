const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.resolve(__dirname, '../build/'))) {
    fs.mkdirSync(path.resolve(__dirname, '../build/'));
}

fs.copyFileSync(path.resolve(__dirname, '../source/index.html'), path.resolve(__dirname, '../build/index.html'));
fs.copyFileSync(path.resolve(__dirname, '../source/style.css'), path.resolve(__dirname, '../build/style.css'));
fs.copyFileSync(path.resolve(__dirname, '../source/tab-icon.svg'), path.resolve(__dirname, '../build/tab-icon.svg'));

