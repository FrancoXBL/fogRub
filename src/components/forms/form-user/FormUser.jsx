import React, { useEffect, useState } from "react";
import z from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "../../../../config/fetchData";
import { editData } from "../../../../config/editData";
import { userSchema } from "../../../schemas/userSchema.js";
import LoadScreen from "../../loadScreen/LoadScreen.jsx";

const FormUser = () => {
  const [formData, setFormData] = useState({
    nombreLocal: "",
    type: "",
    titular: "",
    cel: "",
    direccion: "",
    _id: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await fetchData("user");
        setFormData(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedData = userSchema.parse(formData);
      await editData("user", validatedData);

      toast.success("Usuario editado correctamente");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message;
          return acc;
        }, {});
        setErrorMessages(errorMessages);
        toast.error("Error en la validación de datos del articulo");
      } else {
        toast.update("Error en la validación de datos del articulo");
      }
    }
  };

  if (loading) {
    return <LoadScreen />;
  }

  return (
    <form onSubmit={handleSubmit} className="form-local-container">
      <h1>Mi Local</h1>
      {/* Campo de nombre del local */}
      <div className="form-local-group">
        <label className="form-local-label" htmlFor="nombreLocal">
          Local:
        </label>
        <input
          className="form-local-input"
          type="text"
          name="nombreLocal"
          value={formData.nombreLocal}
          onChange={handleChange}
        />
        {errorMessages.nombreLocal && (
          <input
            placeholder={errorMessages.nombreLocal}
            className="form-local-input"
            type="text"
            name="nombreLocal"
            value={formData.nombreLocal}
            onChange={handleChange}
          />
        )}
      </div>

      {/* Campo de tipo */}
      <div className="form-local-group">
        <label className="form-local-label" htmlFor="type">
          Tipo:
        </label>
        <input
          className="form-local-input"
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
        />
        {errorMessages.type && (
          <input
            placeholder={errorMessages.type}
            className="form-local-input"
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        )}
      </div>

      {/* Campo de titular */}
      <div className="form-local-group">
        <label className="form-local-label" htmlFor="titular">
          Titular:
        </label>
        <input
          className="form-local-input"
          type="text"
          name="titular"
          value={formData.titular}
          onChange={handleChange}
        />
        {errorMessages.titular && (
          <input
            placeholder={errorMessages.titular}
            className="form-local-input"
            type="text"
            name="titular"
            value={formData.titular}
            onChange={handleChange}
          />
        )}
      </div>

      {/* Campo de celular */}
      <div className="form-local-group">
        <label className="form-local-label" htmlFor="cel">
          Celular:
        </label>
        <input
          className="form-local-input"
          type="text"
          name="cel"
          value={formData.cel}
          onChange={handleChange}
        />
        {errorMessages.cel && (
          <input
            placeholder={errorMessages.cel}
            className="form-local-input"
            type="text"
            name="cel"
            value={formData.cel}
            onChange={handleChange}
          />
        )}
      </div>

      {/* Campo de dirección */}
      <div className="form-local-group">
        <label className="form-local-label" htmlFor="direccion">
          Dirección:
        </label>
        <input
          className="form-local-input"
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
        {errorMessages.direccion && (
          <input
            placeholder={errorMessages.direccion}
            className="form-local-input"
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        )}
      </div>

      <button type="submit" className="form-local-submit">
        Aplicar Cambios
      </button>
    </form>
  );
};

export default FormUser;
