import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import MainView from "./components/main-view-components/MainView";
import ArticulosMainView from "./components/articulos-main-view/ArticulosMainView";
import { ToastContainer } from "react-toastify";

import "./App.css";
import ClientsMainView from "./components/clientes-main-view/ClientesMainView";
import FormArticle from "./components/forms/form-article/FormArticle";
import FormClient from "./components/forms/form-client/FormClient";
import FormUser from "./components/forms/form-user/FormUser";
import FormSale from "./components/forms/form-sale/FormSale";
import CajaDiaria from "./components/caja-diaria/CajaDiaria";
import FormGasto from "./components/forms/form-gasto/FormGasto";
import ToPrintTicket from "./components/to-print-ticket/ToPrintTicket";
import ToPrintDayBalance from "./components/to-print-day-balance/ToPrintDayBalance";
import EditArticle from "./components/articulos-main-view/articulo-edit/EditArticle";
import EditClient from "./components/clientes-main-view/cliente-edit/EditClient";
import DeleteClient from "./components/clientes-main-view/cliente-delete/DeleteClient";
import DeleteArticle from "./components/articulos-main-view/articulo-delete/DeleteArticle";

function App() {
  return (
    <>
      <div className="app">
        <ToastContainer
          position="bottom-left"
          autoClose={500}
          hideProgressBar={true}
          stacked={true}
        />
        <Header />
        <Routes>
          <Route path="/" element={<MainView />}></Route>
          <Route path="/usuario" element={<FormUser />}></Route>
          <Route path="/nueva-venta" element={<FormSale />}></Route>
          <Route path="/agregar-gasto" element={<FormGasto />}></Route>
          <Route path="/articulos" element={<ArticulosMainView />}></Route>
          <Route path="/clientes" element={<ClientsMainView />}></Route>
          <Route path="/agregar-articulo" element={<FormArticle />}></Route>
          <Route path="/agregar-cliente" element={<FormClient />}></Route>
          <Route path="/caja-diaria" element={<CajaDiaria />}></Route>
          <Route path="/caja-diaria/print-ticket/:id" element={<ToPrintTicket />}></Route>
          <Route path="/caja-diaria/print-day-balance" element={<ToPrintDayBalance />}></Route>
          <Route path="/articulos/editar/:id" element={<EditArticle />}></Route>
          <Route path="/clientes/editar/:id" element={<EditClient />}></Route>
          <Route path="/clientes/eliminar/:id" element={<DeleteClient />}></Route>
          <Route path="/articulos/eliminar/:id" element={<DeleteArticle />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
