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

const DeleteClient = () => {
  const [clientToDelete, setClientToDelete] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const client = await fetchData(`/clients-list/${id}`);
        setClientToDelete(client);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const handleDelete = async () => {

    try {
      await deleteData("clients-list", clientToDelete);

      toast.success("Cliente eliminado con exito");

      navigate("/clientes");
    } catch (err) {
      console.log(err);
    }
  };

  return (<div className="form-client-container">
    <h1>Seguro que quieres eliminar a {clientToDelete.name} de la lista de clientes?</h1>
    <button onClick={() => {
        handleDelete(clientToDelete)
    }} className="delete-button">Aceptar y Eliminar</button>
  </div>);
};

export default DeleteClient;
