export const justifyText = (text: string): string => {
    const words = text.split(/\s+/);
    const maxLineLength = 80;
    let currentLine: string[] = [];
    let lines: string[] = [];
  
    words.forEach(word => {
      const currentLineLength = currentLine.join(' ').length;
      if (currentLineLength + word.length + 1 <= maxLineLength) {
        currentLine.push(word);
      } else {
        lines.push(justifyLine(currentLine, maxLineLength));
        currentLine = [word];
      }
    });
    
    if (currentLine.length) {
      lines.push(currentLine.join(' '));
    }
  
    return lines.join('\n');
  };
  
  const justifyLine = (words: string[], maxLineLength: number): string => {
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