export const fechaActual = new Date().toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).split('/').join('-'); // Formato 'DD-MM-YYYY'