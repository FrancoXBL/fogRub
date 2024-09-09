import { useState } from "react"
import { Link } from "react-router-dom"

export default function BigButtonNavigate({text, icon, urlTo}){

    const [styleButton, setStyleButton] = useState(`big-button`)

    return(
        <Link className="big-button-link" to={urlTo}>
        <div className={styleButton}>
            <div className="big-button-icon">{icon}</div>
            <div className="big-button-text">{text}</div>
        </div>
        </Link>
    )
}