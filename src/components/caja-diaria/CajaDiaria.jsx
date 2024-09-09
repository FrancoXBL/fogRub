import { useEffect, useState } from "react";
import { fetchData } from "../../../config/fetchData";
import { FaRegTrashAlt } from "react-icons/fa";
import { deleteData } from "../../../config/deleteData";
import { toast } from "react-toastify";
import ActionButton from "../action-button/ActionButton";
import { PiPrinterBold } from "react-icons/pi";
import { FaPrint } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function CajaDiaria() {
  const [todaySales, setTodaySales] = useState([]);
  const [todayGastos, setTodayGastos] = useState([]);
  const [typeSaleList, setTypeSaleList] = useState({});
  const [selectedType, setSelectedType] = useState("efectivo");
  const [totalGlobal, setTotalGlobal] = useState(0);
  const [totalGastos, setTotalGastos] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemType, setItemType] = useState("");

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

  const handleDeleteConfirmation = (item, type) => {
    setItemToDelete(item);
    setItemType(type);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      if (itemType === "venta") {
        await deleteData("ventas", itemToDelete);
        toast.success("Venta eliminada");

        const updatedSales = todaySales.filter(
          (item) => item._id !== itemToDelete._id
        );
        setTodaySales(updatedSales);
        updateTotals(updatedSales, todayGastos);
      } else if (itemType === "gasto") {
        await deleteData("gastos", itemToDelete);
        toast.success("Gasto eliminado");

        const updatedGastos = todayGastos.filter(
          (item) => item._id !== itemToDelete._id
        );
        setTodayGastos(updatedGastos);
        updateTotals(todaySales, updatedGastos);
      }

      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTotals = (sales, gastos) => {
    const { totalesPorMetodo, totalGlobal, totalGastos } =
      separarTotalesPorMetodo(sales, gastos);
    setTotalGlobal(totalGlobal);
    setTypeSaleList(totalesPorMetodo);
    setTotalGastos(totalGastos);
  };
  return (
    <div className="caja-diaria-container">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>¿Estás seguro de que deseas eliminar esta {itemType}?</h3>
            <button className="modal-button-confirm" onClick={handleDelete}>Confirmar</button>
            <button onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
      <div className="caja-diaria-balance">
        <div className="caja-diaria-monto-global">
          <h2>Total Global</h2>
          <div className="total-global-box">$ {totalGlobal}</div>
        </div>
        <h3>Total pagos en:</h3>
        <div className="caja-diaria-monto-especifico">
          <div className="caja-diaria-monto-select">
            <select
              className="option-monto-select"
              onChange={(e) => setSelectedType(e.target.value)}
              name=""
              id=""
            >
              <option value="efectivo">Efectivo</option>
              <option value="debito">Debito</option>
              <option value="transferencia">Transferencia</option>
              <option value="qr">Qr</option>
              <option value="credito">Credito</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="caja-diaria-monto-especifico-box">
            ${" "}
            {typeSaleList[`${selectedType}`] === undefined
              ? "0"
              : typeSaleList[`${selectedType}`]}
          </div>
        </div>
        <div className="caja-diaria-gastos-especifico">
          <h3>
            Total gastos diarios: <span>$ {totalGastos}</span>
          </h3>
        </div>

        <Link to={"/caja-diaria/print-day-balance"} className="button-box">
          <ActionButton
            icon={<PiPrinterBold />}
            text={"Imprimir Caja Diaria"}
          />
        </Link>
      </div>
      <div className="caja-diaria-ventas-gastos">
        <h2 className="subrayado-parcial">Ventas</h2>
        <div className="caja-diaria-ultimas-ventas">
          {todaySales.map((sale, index) => (
            <div key={index} className="sale-card">
              <div>
                $ {sale.total} en {sale.soldIn}{" "}
              </div>
              <div>
                <Link to={`print-ticket/${sale._id}`}>
                  <FaPrint className="sale-item-icon-print" />
                </Link>
                <FaRegTrashAlt
                  onClick={() => handleDeleteConfirmation(sale, "venta")}
                  className="sale-item-icon"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="caja-diaria-ultimas-ventas">
          <h2 className="subrayado-parcial">Gastos Diarios</h2>
          <div className="caja-diaria-ultimas-ventas">
            {todayGastos.map((gasto, index) => (
              <div key={index} className="sale-card">
                $ {gasto.total} extraido de {gasto.type}{" "}
                <FaRegTrashAlt
                  onClick={() => handleDeleteConfirmation(gasto, "gasto")}
                  className="sale-item-icon"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
