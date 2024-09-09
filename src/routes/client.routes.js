import { Router } from "express";
import { fechaActual } from "../../config/dayDate.js";
import path from "path";
import { __dirname } from "../../config/pathConfig.js";
import { v4 as uuidv4 } from "uuid";
import {
  actualizarExcel,
  leerExcel,
} from "../utils/excelUtils.js";

const router = Router();

router.get("/clients-list", (req, res) => {
  const clientsList = leerExcel(
    path.join(__dirname, "../data/clientes.xlsx")
  );

  res.json(clientsList);
});

router.get("/clients-list/:id", (req, res) => {
  const id = req.params.id;

  const clientsList = leerExcel(
    path.join(__dirname, "../data/clientes.xlsx")
  );

  const findClient = clientsList.find((client) => client._id == id);

  res.json(findClient);
});

router.post("/clients-list", (req, res) => {

  if (req.body.celNumber) {
    req.body.celNumber = req.body.celNumber.replace(/\s+/g, "");
  }

  const newClient = { ...req.body, _id: uuidv4(), lastEdit: fechaActual };

  const clientsList = leerExcel(
    path.join(__dirname, "../data/clientes.xlsx")
  );

  clientsList.push(newClient);

  actualizarExcel(
    path.join(__dirname, "../data/clientes.xlsx"),
    clientsList
  );

  res.json({ message: "todo piola" });
});

router.put("/clients-list", (req, res) => {
  const toEditClient = req.body;

  const clientsList = leerExcel(
    path.join(__dirname, "../data/clientes.xlsx")
  );

  const newList = clientsList.map((client) =>
    client._id === toEditClient._id ? toEditClient : client
  );

  actualizarExcel(path.join(__dirname, "../data/clientes.xlsx"), newList);

  res.json({ message: "todo piola" });
});

router.delete("/clients-list", (req, res) => {
  const toDeleteClient = req.body;

  const clientsList = leerExcel(
    path.join(__dirname, "../data/clientes.xlsx")
  );

  const newList = clientsList.filter((client) =>
    client._id != toDeleteClient._id ? client : ""
  );

  actualizarExcel(path.join(__dirname, "../data/clientes.xlsx"), newList);

  res.json({ message: "todo piola" });
});

export default router;
