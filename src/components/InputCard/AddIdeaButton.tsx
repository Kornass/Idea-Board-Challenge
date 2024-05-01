import "../Card/card.css";
import "./addIdeaButton.css";
import { IdeasContext } from "../../context/IdeasContext.tsx";
import { useContext } from "react";
import { ContextType } from "../../types.ts";

function AddIdeaButton() {
  const { setModalOpen } = useContext(IdeasContext) as ContextType;

  return (
    <button className="card first animate" onClick={() => setModalOpen(true)}>
      <span>+</span>
    </button>
  );
}

export default AddIdeaButton;