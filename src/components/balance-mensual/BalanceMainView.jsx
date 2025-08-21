import React, { useEffect, useState } from "react";
import { fetchData } from "../../../config/fetchData";
import "./balanceMainView.css"; // estilos aparte
import { Link } from "react-router-dom";

export default function BalanceMensual() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchData("balance");
      setData(result);
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <p className="loading">Cargando...</p>;

  // Totales del mes
  const totalVentasMes = data.reduce((acc, dia) => acc + dia.totalVentas, 0);
  const totalGastosMes = data.reduce((acc, dia) => acc + dia.totalGastos, 0);
  const balanceMes = totalVentasMes - totalGastosMes;

  return (
    <div className="balance-container">
      {/* Resumen principal */}
      <div className="resumen-mes">
        <h2>📊 Balance Mensual</h2>
        <div className="resumen-cards">
          <div className="card ventas">Ventas: ${totalVentasMes}</div>
          <div className="card gastos">Gastos: ${totalGastosMes}</div>
          <div className={`card balance ${balanceMes >= 0 ? "positivo" : "negativo"}`}>
            Balance: ${balanceMes}
          </div>
        </div>
      </div>

      {/* Tabla con resumen día a día */}
      <div className="tabla-section">
        <h3>Resumen Diario</h3>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Total Ventas</th>
              <th>Total Gastos</th>
              <th>Balance</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dia) => {
              const balanceDia = dia.totalVentas - dia.totalGastos;
              return (
                <tr key={dia._id}>
                  <td>{dia.fecha}</td>
                  <td>${dia.totalVentas}</td>
                  <td>${dia.totalGastos}</td>
                  <td className={balanceDia >= 0 ? "positivo" : "negativo"}>
                    ${balanceDia}
                  </td>
                  <td>
                    <Link to={`/balance/${dia._id}`} className="btn">Ver Detalles</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
