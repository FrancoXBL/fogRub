import { Router } from "express";
import path from "path";
import { __dirname } from "../../config/pathConfig.js";
import { v4 as uuidv4 } from "uuid";
import { actualizarExcel, leerExcel } from "../utils/excelUtils.js";
import { fechaActual } from "../../config/dayDate.js";

const urlVentas = path.join(__dirname, `../cajas-diarias/${fechaActual}/ventas.xlsx`);

const router = Router();

router.get("/ventas", (req, res) => {
  const articleList = leerExcel(urlVentas);

  const convertedList = articleList.map(item => {
    if (typeof item.items === 'string') {
      try {
        item.items = JSON.parse(item.items);
      } catch (error) {
        console.error("Error parsing items:", error);
        item.items = [];
      }
    }
    return item;
  });

  res.json(convertedList);
});

router.get("/ventas/:id", (req, res) => {
  const id = req.params.id;

  const ventasList = leerExcel(urlVentas);

  const findVenta = ventasList.find((venta) => venta._id == id);

  res.json(findVenta);
});

router.post("/ventas", (req, res) => {
  const newVenta = { ...req.body, items: JSON.stringify(req.body.items), _id: uuidv4() };

  const ventasList = leerExcel(urlVentas);

  ventasList.push(newVenta);

  actualizarExcel(urlVentas, ventasList);

  res.json({ message: "todo piola" });
});

router.put("/ventas", (req, res) => {
  const toEditVenta = req.body;

  const ventasList = leerExcel(urlVentas);

  const newList = ventasList.map((venta) => venta._id == toEditVenta._id ? toEditVenta : venta );

  actualizarExcel(urlVentas, newList);

  res.json({ message: "todo piola" });
});

router.delete("/ventas", (req, res) => {
  const toDeleteVenta = req.body;

  const ventasList = leerExcel(urlVentas);

  const newList = ventasList.filter((venta) => venta._id != toDeleteVenta._id ? venta : "" );

  actualizarExcel(urlVentas, newList);

  res.json({ message: "todo piola" });
});

export default router;
