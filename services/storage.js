import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../config/ta.json');

export function saveTA(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function loadTA() {
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  }
  return null;
}
