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

const EditClient = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams()

  const [errorMessages, setErrorMessages] = useState({});

  useEffect(() => {
    const getUser = async () => {
        try {
            const client = await fetchData(`/clients-list/${id}`)
            setFormData(client)
        } catch (err) {
            console.log(err)
        }
    }
    getUser()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sendData = { ...formData, lastEdit: fechaActual };

    try {
      sendData.celNumber = sendData.celNumber.replace(/\D/g, "");
      await editData("clients-list", sendData);

      toast.success("Cliente editado con exito");

      navigate("/clientes");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrorMessages(errorMessages);
        toast.error("Error en la validacion de datos del cliente");
      } else {
        toast.error("Error en la validacion de datos del cliente");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-client-container">
      <h1>Editar cliente</h1>
      <div className="form-client-group">
        <label className="form-client-label" htmlFor="name">
          Nombre:
        </label>
        <input
          className="form-client-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errorMessages.name && (
          <input
            placeholder={errorMessages.name}
            className="form-client-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-client-group">
        <label className="form-client-label" htmlFor="type">
          Tipo de Cuenta:
        </label>
        <input
          className="form-client-input"
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
        {errorMessages.type && (
          <input
            placeholder={errorMessages.type}
            className="form-client-input"
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-client-group">
        <label className="form-client-label" htmlFor="celNumber">
          Celular:
        </label>
        <input
          className="form-client-input"
          type="text"
          name="celNumber"
          value={formData.celNumber}
          onChange={handleChange}
        />
        {errorMessages.celNumber && (
          <input
            placeholder={errorMessages.celNumber}
            className="form-client-input"
            type="text"
            name="celNumber"
            value={formData.celNumber}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-client-group">
        <label className="form-client-label" htmlFor="direccion">
          Dirección:
        </label>
        <input
          className="form-client-input"
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
        {errorMessages.direccion && (
          <input
            placeholder={errorMessages.direccion}
            className="form-client-input"
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-client-group">
        <label className="form-client-label" htmlFor="description">
          Descripción:
        </label>
        <input
          className="form-client-input"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errorMessages.description && (
          <input
            placeholder={errorMessages.description}
            className="form-client-input"
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-client-group">
        <label className="form-client-label" htmlFor="notes">
          Notas:
        </label>
        <input
          className="form-client-input"
          type="text"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
        />
        {errorMessages.notes && (
          <input
            placeholder={errorMessages.notes}
            className="form-client-input"
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-client-group">
        <label className="form-client-label" htmlFor="debt">
          Deuda:
        </label>
        <input
          className="form-client-input"
          type="number"
          name="debt"
          value={formData.debt}
          onChange={handleChange}
        />
        {errorMessages.debt && (
          <input
            placeholder={errorMessages.debt}
            className="form-client-input"
            type="number"
            name="debt"
            value={formData.debt}
            onChange={handleChange}
          />
        )}
      </div>
      <h3>Vista previa del Cliente</h3>
      <div className="articulo-card-container">
        <div className="articulo-card-text">
          <div>
            {formData.name} - {formData.type} - Deuda: {formData.debt}
          </div>
          <div>Actualizado por ultima vez: {formData.lastEdit}</div>
        </div>
        <button type="submit" className="form-client-submit">
          Editar Cliente
        </button>
      </div>
    </form>
  );
};

export default EditClient;
