"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.justifyText = void 0;
const justifyText = (text) => {
    const words = text.split(/\s+/);
    const maxLineLength = 80;
    let currentLine = [];
    let lines = [];
    words.forEach(word => {
        const currentLineLength = currentLine.join(' ').length;
        if (currentLineLength + word.length + 1 <= maxLineLength) {
            currentLine.push(word);
        }
        else {
            lines.push(justifyLine(currentLine, maxLineLength));
            currentLine = [word];
        }
    });
    if (currentLine.length) {
        lines.push(currentLine.join(' '));
    }
    return lines.join('\n');
};
exports.justifyText = justifyText;
const justifyLine = (words, maxLineLength) => {
    let line = words.join(' ');
    const spacesNeeded = maxLineLength - line.length;
    let gaps = words.length - 1;
    if (gaps > 0) {
        let spaces = Array(gaps).fill(Math.floor(spacesNeeded / gaps));
        for (let i = 0; i < spacesNeeded % gaps; i++) {
            spaces[i]++;
        }
        line = words[0];
        for (let i = 0; i < gaps; i++) {
            line += ' '.repeat(spaces[i]) + words[i + 1];
        }
    }
    return line;
};
