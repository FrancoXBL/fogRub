import { Router } from "express";
import path from "path";
import { __dirname } from "../../config/pathConfig.js";
import { v4 as uuidv4 } from "uuid";
import {
  actualizarExcel,
  leerExcel,
} from "../utils/excelUtils.js";

const router = Router();

router.get("/articles-list", (req, res) => {
  const articleList = leerExcel(
    path.join(__dirname, "../data/listaArticulos.xlsx")
  );

  res.json(articleList);
});

router.get("/articles-list/:id", (req, res) => {
  const id = req.params.id;

  const articleList = leerExcel(
    path.join(__dirname, "../data/listaArticulos.xlsx")
  );

  const findArticle = articleList.find((article) => article._id == id);

  res.json(findArticle);
});

router.post("/articles-list", (req, res) => {
  const newArticle = { ...req.body, _id: uuidv4() };

  const articleList = leerExcel(
    path.join(__dirname, "../data/listaArticulos.xlsx")
  );

  articleList.push(newArticle);

  actualizarExcel(
    path.join(__dirname, "../data/listaArticulos.xlsx"),
    articleList
  );

  res.json({ message: "todo piola" });
});

router.put("/articles-list", (req, res) => {

  const toEditArticle = req.body;

  const articleList = leerExcel(
    path.join(__dirname, "../data/listaArticulos.xlsx")
  );

  const newList = articleList.map((article) =>
    article._id == toEditArticle._id ? toEditArticle : article
  );

  actualizarExcel(path.join(__dirname, "../data/listaArticulos.xlsx"), newList);

  res.json({ message: "todo piola" });
});

router.delete("/articles-list", (req, res) => {
  const toEditArticle = req.body;

  const articleList = leerExcel(
    path.join(__dirname, "../data/listaArticulos.xlsx")
  );

  const newList = articleList.filter((article) =>
    article._id != toEditArticle._id ? article : ""
  );

  actualizarExcel(path.join(__dirname, "../data/listaArticulos.xlsx"), newList);

  res.json({ message: "todo piola" });
});

export default router;
