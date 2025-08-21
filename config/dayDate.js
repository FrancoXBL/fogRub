export const fechaActual = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('-'); // Formato 'DD-MM-YYYY'

export const mesActual = new Date().toLocaleDateString('es-ES', {
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('-'); // Formato 'MM-YYYY'