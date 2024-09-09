import XLSX from "xlsx";
const { readFile } = XLSX;
import limpiarHoja from "./cleanSheet.js";
import path from "path";
import { __dirname } from "../../config/pathConfig.js";
import fs from 'fs'
import { fechaActual } from '../../config/dayDate.js'

// Función para leer un archivo Excel
export function leerExcel(pathFile) {
  const workbook = XLSX.readFile(pathFile);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);

  return jsonData;
}

// Función para crear y guardar un archivo Excel
export function crearYGuardarExcel(data, nombreArchivo) {
  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Hoja1");

  XLSX.writeFile(workbook, nombreArchivo);
}

// Función para crear archivos específicos (Ventas, Gastos, Balance)
export function crearArchivosDiarios() {
  const directorioBase = path.join(__dirname, '../cajas-diarias');
  const directorioFecha = path.join(directorioBase, fechaActual);

  // Verificar si el directorio "cajas-diarias" existe, si no, crearlo
  if (!fs.existsSync(directorioBase)) {
      fs.mkdirSync(directorioBase, { recursive: true });
  }

  // Verificar si el directorio con la fecha actual existe, si no, crearlo
  if (!fs.existsSync(directorioFecha)) {
      fs.mkdirSync(directorioFecha);
  }

  // Rutas de los archivos "caja.xlsx" y "gastos.xlsx"
  const archivoCaja = path.join(directorioFecha, 'ventas.xlsx');
  const archivoGastos = path.join(directorioFecha, 'gastos.xlsx');

  // Crear los archivos Excel si no existen
  if (!fs.existsSync(archivoCaja)) {
      const wbCaja = XLSX.utils.book_new();
      const wsCaja = XLSX.utils.aoa_to_sheet([]); // Hoja vacía
      XLSX.utils.book_append_sheet(wbCaja, wsCaja, 'Ventas');
      XLSX.writeFile(wbCaja, archivoCaja);
  }

  if (!fs.existsSync(archivoGastos)) {
      const wbGastos = XLSX.utils.book_new();
      const wsGastos = XLSX.utils.aoa_to_sheet([]); // Hoja vacía
      XLSX.utils.book_append_sheet(wbGastos, wsGastos, 'Gastos');
      XLSX.writeFile(wbGastos, archivoGastos);
  }

  // console.log(`Archivos diarios creados en la carpeta ${directorioFecha}`);
}

// Función para actualizar un archivo Excel existente
export function actualizarExcel(file, newData) {

  const workbook = XLSX.readFile(file);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  limpiarHoja(sheet)
  
  XLSX.utils.sheet_add_json(sheet, newData)
  XLSX.writeFile(workbook, file)

}
