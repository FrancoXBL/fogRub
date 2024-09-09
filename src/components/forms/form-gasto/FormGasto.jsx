import React, { useState } from "react";
import { sendData } from "../../../../config/sendData";
import { gastoSchema } from "../../../schemas/gastoSchema";
import z from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const FormGasto = () => {
  const [formData, setFormData] = useState({
    total: null,
    type: null,
    description: null,
  });

  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedData = gastoSchema.parse(formData);
      await sendData("gastos", validatedData);

      toast.success("Gasto agregado");

      navigate("/caja-diaria");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrorMessages(errorMessages);
        toast.error("Error al sumar el gasto, verifique sus datos");
      } else {
        toast.update("Error al sumar el gasto, verifique sus datos");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-gasto-container">
      <h1>Ingresar nuevo gasto</h1>
      <div className="form-gasto-group">
        <label className="form-gasto-label" htmlFor="type">
          Gastado de:
        </label>gasto
        <input
          className="form-gasto-input"
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
        {errorMessages.type && (
          <input
          placeholder={
            errorMessages.total !== "El total es requerido"
              ? "El total es requerido"
              : errorMessages.total
          }
            className="form-gasto-input"
            type="text"
            name="type"
            value={formData.type}
            description
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-gasto-group">
        <label className="form-gasto-label" htmlFor="description">
          Descripcion del gasto:
        </label>
        <input
          className="form-gasto-input"
          type="string"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errorMessages.description && (
          <input
          placeholder={
            errorMessages.total !== "La descripcion es requerida"
              ? "La descripcion es requerida"
              : errorMessages.total
          }
            className="form-gasto-input"
            type="string"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-gasto-group">
        <label className="form-gasto-label" htmlFor="total">
          Total:
        </label>
        <input
          className="form-gasto-input"
          type="string"
          name="total"
          value={formData.total}
          onChange={handleChange}
        />
        {errorMessages.total && (
          <input
            placeholder={
              errorMessages.total !== "El precio es necesario"
                ? "El precio es requerido"
                : errorMessages.total
            }
            className="form-gasto-input"
            type="string"
            name="total"
            value={formData.total}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        <button type="submit" className="form-gasto-submit">
          Agregar Gasto
        </button>
      </div>
    </form>
  );
};

export default FormGasto;
