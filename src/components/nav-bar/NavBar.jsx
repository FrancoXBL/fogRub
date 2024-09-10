import React from "react";
import { NavLink } from "react-router-dom"; // Para navegar entre rutas
import { BiCartAdd } from "react-icons/bi";
import { TbClipboardList, TbClipboardPlus } from "react-icons/tb";
import { MdOutlinePersonOutline, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { IoTodayOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineGroupAdd } from "react-icons/md";
import { PiHandArrowUpBold } from "react-icons/pi";
import "./Navbar.css"; // Importa el archivo CSS para estilos

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/nueva-venta" className="navbar-link">
            <BiCartAdd className="navbar-icon" />
            Nueva Venta
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/articulos" className="navbar-link">
            <TbClipboardList className="navbar-icon" />
            Artículos
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/clientes" className="navbar-link">
            <HiOutlineUserGroup className="navbar-icon" />
            Clientes
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/caja-diaria" className="navbar-link">
            <IoTodayOutline className="navbar-icon" />
            Caja Diaria
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/agregar-articulo" className="navbar-link">
            <TbClipboardPlus className="navbar-icon" />
            Agregar Artículo
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/agregar-cliente" className="navbar-link">
            <MdOutlineGroupAdd className="navbar-icon" />
            Agregar Cliente
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/agregar-gasto" className="navbar-link">
            <PiHandArrowUpBold className="navbar-icon" />
            Agregar Gasto
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink to="/usuario" className="navbar-link">
            <MdOutlinePersonOutline className="navbar-icon" />
            Usuario
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
