import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { MdOutlineSearchOff } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "../../../../config/fetchData";
import { sendData } from "../../../../config/sendData";
import { calculateTotal, reduceStock } from "../../../../config/saleUtils";
import { saleSchema } from "../../../schemas/saleSchema";
import { FaRegTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const SaleForm = () => {
  const [ticketItems, setTicketItems] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formItem, setFormItem] = useState({
    name: "suelto",
    quantity: "1",
    price: "0",
    _id: uuidv4(),
  });
  const [sendSale, setSendSale] = useState({
    soldIn: "efectivo",
    total: "0",
    items: [],
  });

  const handleChangeItem = (e) => {
    setFormItem({ ...formItem, [e.target.name]: e.target.value });
  };

  const handleChangeSale = (e) => {
    setSendSale({ ...sendSale, [e.target.name]: e.target.value });
  };

  const handleAddItem = () => {
    const newItem = {
      ...formItem,
      totalPrice: formItem.price * formItem.quantity,
    };
    const updatedTicketItems = [...ticketItems, newItem];
    setTicketItems(updatedTicketItems);
    calculateTotal(updatedTicketItems, setSendSale);
    setFormItem({
      name: "suelto",
      quantity: "1",
      price: "0",
      _id: uuidv4(),
    });
    toast.success("Item Agregado");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (ticketItems.length === 0) {
      return toast.error("Sume un item antes de concretar la venta");
    }

    const saleData = {
      ...sendSale,
      items: ticketItems,
    };

    try {
      const validatedData = saleSchema.parse(saleData);
      await sendData("ventas", validatedData);

      toast.success("Venta concretada!");

      setFormItem({
        name: "suelto",
        quantity: "1",
        price: "0",
        _id: uuidv4(),
      });

      setTicketItems([]);
      setSendSale({
        soldIn: "efectivo",
        total: "0",
        items: [],
      });

      reduceStock(articleList, ticketItems, setArticleList);
    } catch (err) {
      toast.error("Error al concretar la venta");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value === "") {
      setFilteredProducts(articleList);
    } else {
      const filtered = articleList.filter(
        (article) =>
          article.name.toLowerCase().includes(value) ||
          article.code.toLowerCase().includes(value)
      );
      setFilteredProducts(filtered);
    }
  };

  const handleDelete = (id) => {
    toast.warning("Producto Eliminado de la lista", { duration: 100 });
    setTicketItems((prevItems) => {
      const newList = prevItems.filter((item) => item._id !== id);
      calculateTotal(newList, setSendSale);
      return newList;
    });
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredProducts(articleList);
  };

  const selectArticle = (article) => {
    setFormItem({
      name: article.name,
      quantity: "1",
      price: article.price.toString(),
      _id: uuidv4(),
    });
  };

  useEffect(() => {
    const getArticles = async () => {
      try {
        const data = await fetchData("articles-list");
        setArticleList(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error(error);
      }
    };
    getArticles();
  }, []);

  return (
    <div className="sale-container">
      <form onSubmit={handleSubmit} className="form-sale-container">
        <h2>Nueva Venta</h2>
        <div className="form-sale-group">
          <label className="form-sale-label" htmlFor="name">
            Nombre Articulo:
          </label>
          <input
            required
            className="form-sale-input"
            type="text"
            name="name"
            value={formItem.name}
            onChange={handleChangeItem}
          />
        </div>
        <div className="form-sale-group">
          <label className="form-sale-label" htmlFor="quantity">
            Cantidad:
          </label>
          <input
            required
            className="form-sale-input"
            type="number"
            name="quantity"
            value={formItem.quantity}
            onChange={handleChangeItem}
          />
        </div>

        <div className="form-sale-group">
          <label className="form-sale-label" htmlFor="price">
            Precio:
          </label>
          <input
            className="form-sale-input"
            type="number"
            name="price"
            value={formItem.price}
            onChange={handleChangeItem}
          />
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="form-sale-submit"
        >
          Sumar!
        </button>

        <div className="form-sale-group-last-step">
          <div className="form-sale-total">
            <label className="form-sale-label-text" htmlFor="total">
              Total:
            </label>
            <input
              readOnly
              className="form-sale-input-total"
              type="text"
              name="total"
              value={`$ ${sendSale.total}`}
              disabled
            />
          </div>
          <div className="form-sale-paymethod">
            <label className="form-sale-label-text" htmlFor="soldIn">
              Pago en:
            </label>
            <select
              className="option-sale-paymethod"
              onChange={handleChangeSale}
              name="soldIn"
            >
              <option value="efectivo">Efectivo</option>
              <option value="debito">Debito</option>
              <option value="credito">Credito</option>
              <option value="transferencia">Transferencia</option>
              <option value="qr">Qr</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div className="box-buttons-form-sale">
          <button type="submit" className="sale-form-submit-button">
            Concretar venta
          </button>
        </div>
      </form>
      <div className="info-sale-container">
        <div className="search-item-sale">
          <div className="search-item-sale">
            <div className="search-item-text">
              {searchTerm ? (
                <MdOutlineSearchOff
                  className="search-item-icon"
                  onClick={clearSearch}
                />
              ) : (
                <FaSearch className="search-item-icon" />
              )}
              <input
                type="text"
                placeholder="Buscar artículo..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="search-items-block">
              {filteredProducts.map((article, index) => (
                <div key={index} onClick={() => selectArticle(article)}>
                  <p className="search-item-card">
                    {article.code.toUpperCase()} - {article.name.toLowerCase()}{" "}
                    {article.serving} ${article.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="list-items-container">
          <h3>Venta actual:</h3>
          <div className="div-item-sale-list">
            {ticketItems.map((article, index) => (
              <div className="sale-item-card" key={index}>
                {/* Mostrar cantidad antes del nombre del artículo */}
                <p>
                  {article.quantity} x {article.name.toLowerCase()}{" "}
                  {article.serving} - ${article.totalPrice}
                </p>
                <FaRegTrashAlt
                  onClick={() => handleDelete(article._id)}
                  className="sale-item-icon"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleForm;
