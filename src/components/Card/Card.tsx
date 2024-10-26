import React from "react";
import "./card.css";
import { getDate } from "../../utils/utils.js";
import { IdeasContext } from "../../context/IdeasContext.tsx";
import { useContext } from "react";
import { Idea } from "../../types.ts";
import { ContextType } from "../../types.ts";

type Props = {
  idea: Idea;
};

const Card: React.FC<Props> = ({ idea }) => {
  const { setDeletingId, setEditId, setModalOpen } = useContext(
    IdeasContext
  ) as ContextType;

  // Formatting date to render
  const date: string = getDate(idea).toString().slice(4, 15);

  return (
    <button
      className="card"
      aria-label="edit"
      onClick={() => {
        setEditId(idea.id);
        setModalOpen(true);
      }}
    >
      <h3>{idea.title}</h3>
      <p>{idea.description}</p>
      <button
        className="delete button"
        onClick={(e) => {
          // Stopping event propagation to card node which would trigger opening modal window
          e.stopPropagation();
          setDeletingId(idea.id);
        }}
      >
        Delete idea
      </button>
      <span className="date">{date}</span>
    </button>
  );
};

export default Card;
