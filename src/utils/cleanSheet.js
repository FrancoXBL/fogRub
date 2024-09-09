
import XLSX from 'xlsx'

export default function limpiarHoja(sheet) {
    if (sheet['!ref']) {
        // Recorrer todas las celdas del sheet si el rango está definido
        const range = XLSX.utils.decode_range(sheet['!ref']);
        
        for (let R = range.s.r; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellRef = XLSX.utils.encode_cell({ r: R, c: C });
            // Eliminar el contenido de la celda
            if (sheet[cellRef]) {
              delete sheet[cellRef];
            }
          }
        }
      }
      
      // Limpiar los rangos y propiedades de la hoja
      sheet['!ref'] = undefined;
      sheet['!merges'] = [];
      sheet['!cols'] = [];
      sheet['!rows'] = [];
}
