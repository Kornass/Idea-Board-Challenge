import "./card.css";
import { obtainLatest } from "../../utils/utils.js";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";

function Card({ idea }) {
  const { setDeleting, setIsEdit, setModalOpen } = useContext(DataContext);

  // Formatting date to render
  const date = obtainLatest(idea).toString().slice(4, 15);
  // const date = "Date";
  return (
    <div
      className="card"
      onClick={() => {
        setIsEdit(idea.id);
        setModalOpen(true);
      }}
    >
      <h3>{idea?.title}</h3>
      <p>{idea?.description}</p>
      <button
        className="delete button"
        onClick={(e) => {
          // Stopping event propagation to card node which would trigger opening modal window
          e.stopPropagation();
          // setting deleting to the idea I want to delete - it'll make state truthy that will be an indicator for deleting modal to open
          setDeleting(idea.id);
        }}
      >
        Delete idea
      </button>
      <span className="date">{date}</span>
    </div>
  );
}

export default Card;
