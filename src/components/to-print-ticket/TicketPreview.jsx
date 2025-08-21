"use client"

import { useState, useEffect, useRef } from "react"
import { FaPrint } from "react-icons/fa6"
import { fetchData } from "../../../config/fetchData"

export default function TicketPreview({ ticketItems, sendSale, onClose }) {

  const [userData, setUserData] = useState({})
  const ticketRef = useRef()

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchData("user")
        setUserData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getUser()
  }, [])

  const handlePrint = () => {
    window.print()
  }

  return (
    <div>
        {/* Vista Previa del Ticket */}
        <div ref={ticketRef} className="ticket">
          {/* Header del Ticket */}
          <div className="ticket-header">
            <div className="ticket-header-left-group">
              <h2>{userData.nombreLocal}</h2>
              <p>{userData.titular}</p>
              <p>Tel: {userData.cel}</p>
            </div>
            <div className="ticket-header-right-group">
              <p>Fecha: {new Date().toLocaleDateString()}</p>
              <p className="no-comprobante">** No válido como comprobante fiscal **</p>
            </div>
          </div>

          {/* Cuerpo del Ticket en Formato de Tabla */}
          <div className="ticket-body">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>Venta</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                </tr>
              </thead>
              <tbody>
                {ticketItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer del Ticket */}
          <div className="ticket-footer">
            <h3>Total: ${sendSale.total}</h3>
            <p>Método de pago: {sendSale.soldIn}</p>
            <div className="signature-line">
              <p>Firma del Vendedor: ________________________</p>
            </div>
          </div>
        </div>

        {/* Botón de Impresión */}
        <button
          onClick={handlePrint}
          className="print-button"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            width: "70%",
            margin: "auto",
            marginTop: "10px",
            marginBottom: "10px"
          }}
        >
          <FaPrint size={16} />
          Imprimir Ticket
        </button>
      </div>
  )
}
