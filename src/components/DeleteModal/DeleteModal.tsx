import Modal from "react-modal";
import { IdeasContext } from "../../context/IdeasContext.tsx";
import { useContext } from "react";
import "../NewIdeaModal/modal.css";
import { Idea, ContextType } from "../../types";

if (process.env.NODE_ENV !== "test") Modal.setAppElement("#root");

function DeleteModal() {
  const { deletingId, setDeletingId, deleteIdea, ideas } = useContext(
    IdeasContext
  ) as ContextType;

  const toDelete = ideas.find((idea: Idea) => idea.id === deletingId);

  return (
    <Modal
      isOpen={!!deletingId}
      onRequestClose={() => {
        setDeletingId(null);
      }}
      contentLabel="Delete idea"
      overlayClassName="myoverlay"
      className="myModal"
    >
      <div className="modal del">
        <p>{`Are you sure you want to delete idea of ${toDelete?.title} ?`}</p>
        <button
          className="delete-button"
          onClick={() => deleteIdea(deletingId!)}
        >
          DELETE
        </button>
        <button className="close" onClick={() => setDeletingId(null)}>
          X
        </button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
