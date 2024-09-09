import { Router } from "express";
import path from "path";
import { __dirname } from "../../config/pathConfig.js";
import { v4 as uuidv4 } from "uuid";
import { actualizarExcel, leerExcel } from "../utils/excelUtils.js";
import { fechaActual } from "../../config/dayDate.js";

const urlGastos = path.join(__dirname, `../cajas-diarias/${fechaActual}/gastos.xlsx`);

const router = Router();

router.get("/gastos", (req, res) => {
  const gastosList = leerExcel(urlGastos);

  res.json(gastosList);
});

router.get("/gastos/:id", (req, res) => {
  const id = req.params.id;

  const gastosList = leerExcel(urlGastos);

  const findGasto = gastosList.find((gasto) => gasto._id == id);

  res.json(findGasto);
});

router.post("/gastos", (req, res) => {
  const newGasto = { ...req.body, _id: uuidv4() };

  const gastosList = leerExcel(urlGastos);

  gastosList.push(newGasto);

  actualizarExcel(urlGastos, gastosList);

  res.json({ message: "todo piola" });
});

router.put("/gastos", (req, res) => {
  const toEditGasto = req.body;

  const gastosList = leerExcel(urlGastos);

  const newList = gastosList.map((gasto) => gasto._id == toEditGasto._id ? toEditGasto : gasto );

  actualizarExcel(urlGastos, newList);

  res.json({ message: "todo piola" });
});

router.delete("/gastos", (req, res) => {
  const toDeleteGasto = req.body;

  const gastosList = leerExcel(urlGastos);

  const newList = gastosList.filter((gasto) => gasto._id != toDeleteGasto._id ? gasto : "" );

  actualizarExcel(urlGastos, newList);

  res.json({ message: "todo piola" });
});

export default router;
