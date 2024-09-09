import { useState } from "react"
import { Link } from "react-router-dom"

export default function SmallButtonNavigate({icon, color, urlTo, action}){

    const [styleButton, setStyleButton] = useState(`small-button small-button-${color}`)

    return(
        <Link to={urlTo}>
        <div className={styleButton}>
            <div className="small-button-icon">{icon}</div>
        </div>
        </Link>
    )
}