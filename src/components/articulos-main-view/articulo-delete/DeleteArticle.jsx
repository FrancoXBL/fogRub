import React, { useEffect, useState } from "react";
import { sendData } from "../../../../config/sendData";
import { clientSchema } from "../../../schemas/clientSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { fechaActual } from "../../../../config/dayDate";
import z from "zod";
import { editData } from "../../../../config/editData";
import { fetchData } from "../../../../config/fetchData";
import { deleteData } from "../../../../config/deleteData";

const DeleteArticle = () => {
  const [articleToDelete, setArticleToDelete] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const article = await fetchData(`/articles-list/${id}`);
        setArticleToDelete(article);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const handleDelete = async () => {

    try {
      await deleteData("articles-list", articleToDelete);

      toast.success("Articulo eliminado con exito");

      navigate("/articulos");
    } catch (err) {
      console.log(err);
    }
  };

  return (<div className="form-client-container">
    <h1>Seguro que quieres eliminar '{articleToDelete.name} {articleToDelete.serving}' de la lista de articulos?</h1>
    <button onClick={() => {
        handleDelete(articleToDelete)
    }} className="delete-button">Aceptar y Eliminar</button>
  </div>);
};

export default DeleteArticle;
