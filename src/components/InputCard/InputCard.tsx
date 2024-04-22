import "../Card/card.css";
import "./inputCard.css";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import { ContextType } from "../../types.ts";

function InputCard() {
  const { setModalOpen } = useContext(DataContext) as ContextType;

  return (
    <button className="card first animate" onClick={() => setModalOpen(true)}>
      <span>+</span>
    </button>
  );
}

export default InputCard;
