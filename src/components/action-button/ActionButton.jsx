import { useState } from "react";

export default function ActionButton({ icon, action, text }) {
  const [styleButton, setStyleButton] = useState(`action-button`);

  return (
    <div className={styleButton}>
      <div>{text}</div>
      <div className="action-button-icon">{icon}</div>
    </div>
  );
}
