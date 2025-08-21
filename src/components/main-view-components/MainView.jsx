import BigButtonNavigate from "../big-button/BigButton";
import { BiCartAdd } from "react-icons/bi";
import { TbClipboardList, TbClipboardPlus  } from "react-icons/tb";
import { MdOutlinePersonOutline, MdOutlinePersonAddAlt1 } from "react-icons/md";
import { IoAlbumsOutline, IoTodayOutline } from "react-icons/io5";
import { HiOutlineUserGroup } from "react-icons/hi";
import { MdOutlineGroupAdd } from "react-icons/md";
import { PiHandArrowUpBold } from "react-icons/pi";
import { BsDoorClosed } from "react-icons/bs";

export default function MainView(){
    return(
        <div className="button-navigate-container">
        <BigButtonNavigate text={"Nueva Venta"} urlTo={"/nueva-venta"} icon={<BiCartAdd />}/>
        <BigButtonNavigate text={"Articulos"} urlTo={"/articulos"} icon={<TbClipboardList/>}/>
        <BigButtonNavigate text={"Clientes"} urlTo={"/clientes"} icon={<HiOutlineUserGroup/>}/>
        <BigButtonNavigate text={"Caja Diaria"} urlTo={"/caja-diaria"} icon={<IoTodayOutline/>}/>
        <BigButtonNavigate text={"Balance Mensual"} urlTo={"/balance-mensual"} icon={<IoAlbumsOutline/>}/>
        <BigButtonNavigate text={"Agregar articulo"} urlTo={"/agregar-articulo"} icon={<TbClipboardPlus />}/>
        <BigButtonNavigate text={"Agregar Cliente"} urlTo={"/agregar-cliente"} icon={<MdOutlineGroupAdd />}/>
        <BigButtonNavigate text={"Agregar Gasto"} urlTo={"/agregar-gasto"} icon={<PiHandArrowUpBold />}/>
        <BigButtonNavigate text={"Cerrar Caja Diaria"} urlTo={"caja-diaria/print-day-balance"} icon={<BsDoorClosed />}/>
        <BigButtonNavigate text={"Usuario"} urlTo={"/usuario"} icon={<MdOutlinePersonOutline/>}/>
        </div>
    )
}