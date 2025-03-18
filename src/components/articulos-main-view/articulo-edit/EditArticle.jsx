"use client"

import { useEffect, useState } from "react"
import { fechaActual } from "../../../../config/dayDate"
import z from "zod"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate, useParams } from "react-router-dom"
import { fetchData } from "../../../../config/fetchData"
import { editData } from "../../../../config/editData"

const EditArticle = () => {
  const [formData, setFormData] = useState({})
  const navigate = useNavigate()
  const [errorMessages, setErrorMessages] = useState({})
  const { id } = useParams()
  const [showPercentageModal, setShowPercentageModal] = useState(false)
  const [percentageValue, setPercentageValue] = useState("")

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await fetchData(`articles-list/${id}`)
        setFormData(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchArticle()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const sendData = { ...formData, fechaActualizacion: fechaActual }

    try {
      await editData("articles-list", sendData)

      toast.success("Artículo editado")

      navigate("/articulos")
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errorMessages = err.errors.reduce((acc, error) => {
          acc[error.path[0]] = error.message
          return acc
        }, {})
        setErrorMessages(errorMessages)
        toast.error("Error en la validación de datos del artículo")
      } else {
        toast.update("Error en la validación de datos del artículo")
      }
    }
  }

  const adjustPriceByPercentage = () => {
    if (!percentageValue || isNaN(percentageValue)) {
      toast.error("Por favor ingrese un porcentaje válido")
      return
    }

    const currentPrice = Number.parseFloat(formData.price)
    if (isNaN(currentPrice)) {
      toast.error("El precio actual no es válido")
      return
    }

    const percentage = Number.parseFloat(percentageValue)
    // Calculate new price with percentage adjustment
    const adjustmentFactor = 1 + percentage / 100
    const newPrice = currentPrice * adjustmentFactor

    // Round to nearest hundred (to end with two zeros)
    const roundedPrice = Math.round(newPrice / 100) * 100

    setFormData({ ...formData, price: roundedPrice.toString() })
    setShowPercentageModal(false)
    setPercentageValue("")

    toast.success(`Precio ajustado ${percentage > 0 ? "aumentado" : "reducido"} en ${Math.abs(percentage)}%`)
  }

  return (
    <form onSubmit={handleSubmit} className="form-article-container">
      <h1>Editar artículo</h1>
      <div className="form-article-group">
        <label className="form-article-label" htmlFor="name">
          Nombre:
        </label>
        <input
          className="form-article-input"
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleChange}
        />
        {errorMessages.name && (
          <input
            placeholder={errorMessages.name}
            className="form-article-input"
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="form-article-group">
        <label className="form-article-label" htmlFor="price">
          Precio:
        </label>
        <div className="price-input-container">
          <input
            className="form-article-input-price"
            type="number"
            name="price"
            value={formData.price || ""}
            onChange={handleChange}
          />
          <button type="button" className="price-adjust-button" onClick={() => setShowPercentageModal(true)}>
            %
          </button>
        </div>
        {errorMessages.price && (
          <input
            placeholder={
              errorMessages.price !== "El precio es necesario" ? "El precio es requerido" : errorMessages.price
            }
            className="form-article-input"
            type="number"
            name="price"
            value={formData.price || ""}
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
          value={formData.stock || ""}
          onChange={handleChange}
        />
        {errorMessages.stock && (
          <input
            placeholder={
              errorMessages.stock !== "El Stock es necesario" ? "El Stock es requerido" : errorMessages.stock
            }
            className="form-article-input"
            type="number"
            name="stock"
            value={formData.stock || ""}
            onChange={handleChange}
          />
        )}
      </div>

      <h3>Vista Previa del Artículo</h3>
      <div className="articulo-card-container">
        <div className="articulo-card-text">
          <div>
            {formData.name} {formData.serving} - ${formData.price}
          </div>
          <div>
            {formData.code} - Actualizado por ultima vez: {formData.fechaActualizacion}
          </div>
        </div>
        <button type="submit" className="form-article-submit">
          Editar Artículo
        </button>
      </div>

      {/* Percentage Modal */}
      {showPercentageModal && (
        <div className="percentage-modal-overlay">
          <div className="percentage-modal">
            <h3>Ajustar precio por porcentaje</h3>
            <p>Ingrese un valor positivo para aumentar o negativo para reducir</p>
            <div className="percentage-input-container">
              <input
                type="number"
                value={percentageValue}
                onChange={(e) => setPercentageValue(e.target.value)}
                placeholder="Ej: 10 o -5"
                className="percentage-input"
              />
              <span className="percentage-symbol">%</span>
            </div>
            <div className="percentage-modal-buttons">
              <button
                type="button"
                className="percentage-cancel-button"
                onClick={() => {
                  setShowPercentageModal(false)
                  setPercentageValue("")
                }}
              >
                Cancelar
              </button>
              <button type="button" className="percentage-apply-button" onClick={adjustPriceByPercentage}>
                Aplicar
              </button>
            </div>
          </div>
        </div>
      )}
    </form>
  )
}

export default EditArticle

