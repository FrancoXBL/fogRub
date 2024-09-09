import SmallButtonNavigate from "../../small-button/SmallButton";
import { LuClipboardSignature } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
export default function ClientCard({ client }) {
  return (
    <div className="client-card-container">
      <div className="client-card-text">
        <div>
          {client.name} ({client.description}) - Deuda Total: ${client.debt}
        </div>
        <div>{client.celNumber} - {client.notes} - Actualizado por ultima vez: {client.lastEdit}</div>
        <div>Direccion: {client.direccion}</div>
      </div>
      <div className="client-card-buttons">
        <SmallButtonNavigate
          urlTo={`/clientes/editar/${client._id}`}
          color={"edit"}
          icon={<LuClipboardSignature />}
        />
        <SmallButtonNavigate
          urlTo={`/clientes/eliminar/${client._id}`}
          color={"delete"}
          icon={<FaRegTrashCan />}
        />
      </div>
    </div>
  );
}
