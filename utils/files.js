import fs from "fs";
import path from "path";
import { config } from "dotenv";

// Cargar las variables de entorno desde un archivo .env
config();

// Asegúrate de que las variables de entorno estén definidas
if (!process.env.CERT || !process.env.KEY) {
  throw new Error("Las variables de entorno PEM y KEY deben estar definidas");
}

// Lee el archivo PEM y KEY
export const pem = fs.readFileSync(path.join(path.resolve(), process.env.CERT), "utf-8");
export const key = fs.readFileSync(path.join(path.resolve(), process.env.KEY), "utf-8");
export const ta = fs.readFileSync(path.join(path.resolve(), process.env.TA), "utf-8");
