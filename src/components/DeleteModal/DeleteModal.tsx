import Modal from "react-modal";
import { DataContext } from "../../context/DataContext";
import { useContext } from "react";
import "../NewIdeaModal/modal.css";

Modal.setAppElement("#root");

function DeleteModal() {
  const { deleting, setDeleting, deleteIdea, ideas } = useContext(DataContext);

  const toDelete = ideas.find((idea) => idea.id === deleting);
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
        <button className="delete-button" onClick={() => deleteIdea(deleting)}>
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
