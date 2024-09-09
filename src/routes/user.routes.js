import { Router } from "express";
import path from "path";
import { __dirname } from "../../config/pathConfig.js";
import { v4 as uuidv4 } from "uuid";
import { actualizarExcel, leerExcel } from "../utils/excelUtils.js";

const urlUser = path.join(__dirname, `../data/usuario.xlsx`);

const router = Router();

router.get("/user", (req, res) => {
  const userData = leerExcel(urlUser);

  res.json(userData[0]);
});

router.post("/user", (req, res) => {
  const newUser = {
    ...req.body,
    _id: uuidv4(),
  };

  const userList = leerExcel(urlUser);

  if (userList.length === 0) {
    userList.push(newUser);
    actualizarExcel(urlUser, userList);
    res.json({ message: "todo piola" });
  } else {
    res.json({ message: "No se puede agregar mas de un usuario" });
  }
});

router.put("/user", (req, res) => {
  const toEditUser = req.body;

  const userList = leerExcel(urlUser);

  const newList = userList.map((user) =>
    user._id == toEditUser._id ? toEditUser : user
  );

  actualizarExcel(urlUser, newList);

  res.json({ message: "todo piola" });
});

export default router;
