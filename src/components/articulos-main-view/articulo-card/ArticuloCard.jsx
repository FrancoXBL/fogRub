import SmallButtonNavigate from "../../small-button/SmallButton";
import { LuClipboardSignature } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

export default function ArticuloCard({ article }) {
  return (
    <div className="articulo-card-container">
      <div className="articulo-card-text">
        <div>
          {article.name} {article.serving} - ${article.price}
        </div>
        <div>
          {article.code} - Actualizado por ultima vez:{" "}
          {article.fechaActualizacion}
        </div>
      </div>
      <div className="articulo-card-buttons">
        <SmallButtonNavigate
          urlTo={`/articulos/editar/${article._id}`}
          color={"edit"}
          icon={<LuClipboardSignature />}
        />

        <SmallButtonNavigate
          urlTo={`/articulos/eliminar/${article._id}`}
          color={"delete"}
          icon={<FaRegTrashCan />}
        />
      </div>
    </div>
  );
}
