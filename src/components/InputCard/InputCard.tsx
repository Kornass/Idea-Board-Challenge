import "../Card/card.css";
import "./inputCard.css";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";

function InputCard() {
  const { setModalOpen } = useContext(DataContext);

  return (
    <button className="card first animate" onClick={() => setModalOpen(true)}>
      <span>+</span>
    </button>
  );
}

export default InputCard;
