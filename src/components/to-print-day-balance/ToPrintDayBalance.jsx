import { useEffect, useState, useRef } from "react";
import { fetchData } from "../../../config/fetchData";
import { fechaActual } from "../../../config/dayDate"; // Importación de la fecha actual

export default function ToPrintDayBalance() {
  const [todaySales, setTodaySales] = useState([]);
  const [todayGastos, setTodayGastos] = useState([]);
  const [typeSaleList, setTypeSaleList] = useState({});
  const [totalGlobal, setTotalGlobal] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [showPreview, setShowPreview] = useState(false); // Estado para mostrar la vista previa
  const printRef = useRef();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const salesData = await fetchData("ventas");
      setTodaySales(salesData);

      const gastosData = await fetchData("gastos");
      setTodayGastos(gastosData);
      updateTotals(salesData, gastosData);
    } catch (error) {
      console.log(error);
    }
  };

  function separarTotalesPorMetodo(ventas, gastos) {
    const totalesPorMetodo = {};
    let totalGlobal = 0;
    let totalGastos = 0;

    ventas.forEach((venta) => {
      const metodoPago = venta.soldIn;
      const total = parseFloat(venta.total);

      if (totalesPorMetodo[metodoPago]) {
        totalesPorMetodo[metodoPago] += total;
      } else {
        totalesPorMetodo[metodoPago] = total;
      }

      totalGlobal += total;
    });

    gastos.forEach((gasto) => {
      totalGastos += parseFloat(gasto.total);
    });

    return { totalesPorMetodo, totalGlobal, totalGastos };
  }

  const updateTotals = (sales, gastos) => {
    const { totalesPorMetodo, totalGlobal, totalGastos } = separarTotalesPorMetodo(sales, gastos);
    setTotalGlobal(totalGlobal);
    setTypeSaleList(totalesPorMetodo);
    setTotalGastos(totalGastos);
  };

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Balance Diario</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .totals { margin-top: 20px; font-weight: bold; }
          </style>
        </head>
        <body>${printContent}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div>
      {!showPreview && (
          <div ref={printRef}>
          <h2>Balance Diario - {fechaActual}</h2> {/* Muestra la fecha actual */}
          <table>
            <thead>
              <tr>
                <th>Método de Pago</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(typeSaleList).map(([metodo, total]) => (
                  <tr key={metodo}>
                  <td>{metodo}</td>
                  <td>{total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="totals">
            <p>Total de Ventas: ${totalGlobal.toFixed(2)}</p>
            <p>Total de Gastos: ${totalGastos.toFixed(2)}</p>
            <p>Balance Neto: ${(totalGlobal - totalGastos).toFixed(2)}</p>
          </div>
        </div>
      )}
      <button onClick={handlePrint} className="print-button">Imprimir Balance Diario</button>
    </div>
  );
}
