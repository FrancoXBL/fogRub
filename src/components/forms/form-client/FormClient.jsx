import React, { useState } from "react";
import { sendData } from "../../../../config/sendData";
import { clientSchema } from "../../../schemas/clientSchema";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { fechaActual } from "../../../../config/dayDate";
import z from "zod";

const FormClient = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    celNumber: "",
    direccion: "",
    description: "",
    notes: "",
    debt: "",
    lastEdit: fechaActual,
  });

  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      formData.celNumber = formData.celNumber.replace(/\D/g, "");

      const validatedData = clientSchema.parse(formData);
      await sendData("clients-list", validatedData);

      toast.success("Cliente agregado con exito");

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
      <h1>Agregar nuevo cliente</h1>
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
          Agregar Cliente
        </button>
      </div>
    </form>
  );
};

export default FormClient;
