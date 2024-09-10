import React, { useState } from "react";
import { sendData } from "../../../../config/sendData";
import { articleSchema } from "../../../schemas/articleSchema";
import { fechaActual } from "../../../../config/dayDate";
import z from "zod";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const FormArticle = () => {
  const [formData, setFormData] = useState({
    name: "",
    serving: "",
    price: null,
    stock: null,
    code: "",
    fechaActualizacion: fechaActual,
  });

  const navigate = useNavigate();

  const [errorMessages, setErrorMessages] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const validatedData = articleSchema.parse(formData);
      await sendData("articles-list", validatedData);

      toast.success("Artiiculo agregado")

      navigate("/articulos");
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

  return (
    <form onSubmit={handleSubmit} className="form-article-container">
      <h1>Agregar nuevo articulo</h1>
      <div className="form-article-group">
        <label className="form-article-label" htmlFor="name">
          Nombre:
        </label>
        <input
          className="form-article-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errorMessages.name && (
          <input
            placeholder={errorMessages.name}
            className="form-article-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-article-group">
        <label className="form-article-label" htmlFor="price">
          Precio:
        </label>
        <input
          className="form-article-input"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        {errorMessages.price && (
          <input
            placeholder={errorMessages.price !== "El precio es necesario" ? "El precio es requerido" : errorMessages.price}
            className="form-article-input"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-article-group">
        <label className="form-article-label" htmlFor="stock">
          Stock:
        </label>
        <input
          className="form-article-input"
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
        {errorMessages.stock && (
          <input
            placeholder={errorMessages.stock !== "El Stock es necesario" ? "El Stock es requerido" : errorMessages.stock}
            className="form-article-input"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-article-group">
        <label className="form-article-label" htmlFor="code">
          Código:
        </label>
        <input
          className="form-article-input"
          type="text"
          name="code"
          value={formData.code}
          onChange={handleChange}
        />
        {errorMessages.code && (
          <input
            placeholder={errorMessages.code}
            className="form-article-input"
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
        )}
      </div>
      <h3>Vista Previa del Articulo</h3>
      <div className="articulo-card-container">
        <div className="articulo-card-text">
          <div>
            {formData.name} {formData.serving} - ${formData.price}
          </div>
          <div>
            {formData.code} - Actualizado por ultima vez:{" "}
            {formData.fechaActualizacion}
          </div>
        </div>
        <button type="submit" className="form-article-submit">
          Agregar Articulo
        </button>
      </div>
    </form>
  );
};

export default FormArticle;
