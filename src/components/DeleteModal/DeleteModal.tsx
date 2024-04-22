import Modal from "react-modal";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import "../NewIdeaModal/modal.css";
import { Idea } from "../../types";
import { ContextType } from "../../types.ts";

Modal.setAppElement("#root");

function DeleteModal() {
  const { deleting, setDeleting, deleteIdea, ideas } = useContext(
    DataContext
  ) as ContextType;

  const toDelete = ideas.find((idea: Idea) => idea.id === deleting);
  return (
    <Modal
      isOpen={!!deleting}
      onRequestClose={() => {
        setDeleting(null);
      }}
      contentLabel="Delete idea"
      overlayClassName="myoverlay"
      className="myModal"
    >
      <div className="modal del">
        <p>{`Are you sure you want to delete idea of ${toDelete?.title} ?`}</p>
        {/* Using non-null assertion operator ! cause dedleting is null only initially. When this function is called, deleting type is always 'string' */}
        <button className="delete-button" onClick={() => deleteIdea(deleting!)}>
          DELETE
        </button>
        <button className="close" onClick={() => setDeleting(null)}>
          X
        </button>
      </div>
    </Modal>
  );
}

export default DeleteModal;
