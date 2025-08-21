import { useState } from "react";

export default function ActionButton({ icon, style, text }) {

  return (
    <div className={style}>
      <div>{text}</div>
      <div className="action-button-icon">{icon}</div>
    </div>
  );
}
