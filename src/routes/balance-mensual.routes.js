import { Router } from "express";
import path from "path";
import { __dirname } from "../../config/pathConfig.js";
import { v4 as uuidv4 } from "uuid";
import { actualizarExcel, leerExcel } from "../utils/excelUtils.js";
import { mesActual, fechaActual } from "../../config/dayDate.js";

const urlBalanceMensual = path.join(__dirname, `../cajas-mensuales/${mesActual}/balance-mensual.xlsx`);

const router = Router();

router.get("/balance", (req, res) => {
  const articleList = leerExcel(urlBalanceMensual);

  const convertedList = articleList.map(item => {
    if (typeof item.ventas === 'string') {
      try {
        item.ventas = JSON.parse(item.ventas);
        item.gastos = JSON.parse(item.gastos);

      } catch (error) {
        console.error("Error parsing ventas:", error);
        item.ventas = [];
        item.gastos = [];
      }
    }
    return item;
  });

  res.json(convertedList);
});

router.get("/balance/:id", (req, res) => {
  const id = req.params.id;

  const ventasList = leerExcel(urlBalanceMensual);

  const findVenta = ventasList.find((venta) => venta._id == id);

  res.json(findVenta);
});

router.post("/balance", (req, res) => {
  const balanceList = leerExcel(urlBalanceMensual);

  // Revisar si ya existe un balance en la misma fecha
  const existingIndex = balanceList.findIndex(
    (balance) => balance.fecha === req.body.fecha
  );

  const newBalance = {
    ...req.body,
    gastos: JSON.stringify(req.body.gastos),
    ventas: JSON.stringify(req.body.ventas),
    totalGastos: req.body.totalGastos,
    totalVentas: req.body.totalVentas,
    _id: existingIndex !== -1 ? balanceList[existingIndex]._id : uuidv4(), // si ya existía, mantener el _id
  };

  if (existingIndex !== -1) {
    // Si existe, reemplazarlo
    balanceList[existingIndex] = newBalance;
  } else {
    // Si no existe, agregarlo
    balanceList.push(newBalance);
  }

  actualizarExcel(urlBalanceMensual, balanceList);

  res.json({ message: existingIndex !== -1 ? "Balance actualizado" : "Balance agregado" });
});

router.put("/balance", (req, res) => {
  const toEditBalance = req.body;

  const balanceList = leerExcel(urlBalanceMensual);

  const newList = balanceList.map((balance) => balance._id == toEditBalance._id ? toEditBalance : balance );

  actualizarExcel(urlBalanceMensual, newList);

  res.json({ message: "todo piola" });
});

router.delete("/balance", (req, res) => {
  const toDelete = req.body;

  const balanceList = leerExcel(urlBalanceMensual);

  const newList = balanceList.filter((balance) => balance._id != toDelete._id ? balance : "" );

  actualizarExcel(urlBalanceMensual, newList);

  res.json({ message: "todo piola" });
});

export default router;
